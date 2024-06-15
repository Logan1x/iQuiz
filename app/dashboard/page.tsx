"use client";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useGetUser } from "@/contexts/user";
import { QuizType } from "@/types/quiz";
import { getTotalWeightageOfquiz } from "./helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdHistory } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import HistoryDialog from "./components/history/history";

const Dashboard: React.FC = () => {
  const { user } = useGetUser();
  const [loading, setLoading] = useState(true);
  const [batchOfQuiz, setBatchOfQuiz] = useState<Array<QuizType> | []>([]);

  useLayoutEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/quizByUid?uid=${user?.id}`);
          setBatchOfQuiz(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user]);

  const Loader = () => (
    <div className="flex justify-center h-screen mt-20">
      <p>
        Loading <span className="animate-ping">...</span>
      </p>
    </div>
  );

  return (
    <div className="container px-4 md:px-24 py-12 mx-auto relative">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Quizboard</h1>
        <Link
          className="px-4 py-2 rounded shadow font-semibold border-gray-700 border-2 text-gray-700 hover:bg-gray-700 hover:text-gray-50 hover:shadow-lg transition duration-300 ease-in-out"
          href="/generate-quiz"
        >
          Generate new quiz
        </Link>
      </div>
      <section>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col flex-wrap gap-6 mt-6">
            {batchOfQuiz.length > 0 ? (
              batchOfQuiz.map(({ id, quiz, created_at }) => {
                const actuallyCreatedAt =
                  moment(created_at).format("DD MMMM, YYYY");

                const { topic, questions } = JSON.parse(quiz as string);
                const totalWeightage = getTotalWeightageOfquiz(questions);

                return (
                  <div
                    key={id}
                    className="rounded flex flex-col md:items-baseline md:flex-row px-4 py-6 w-full justify-between shadow flex-wrap"
                  >
                    <div className="gap-1">
                      <p className="font-semibold text-2xl md:text-xl capitalize">
                        {topic}
                      </p>
                      <div className="flex gap-1 md:gap-2 flex-row text-xs md:text-base text-gray-600">
                        <p>
                          <span className="text-sm font-bold">
                            {questions.length}
                          </span>{" "}
                          Questions
                        </p>
                        <p>•</p>
                        <p>
                          Total Weightage:{" "}
                          <span className="text-sm font-bold">
                            {totalWeightage}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="block md:hidden self-end text-xs text-gray-400">
                        Created at {actuallyCreatedAt}
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/quiz/${id}`}
                          className="w-full md:w-fit border px-4 py-2 rounded shadow font-semibold bg-gray-700 text-gray-50 hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
                        >
                          Play Quiz
                        </Link>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Dialog>
                                <DialogTrigger>
                                  <MdHistory size={24} />
                                </DialogTrigger>
                                <HistoryDialog
                                  qid={id}
                                  totalWeightage={totalWeightage}
                                />
                              </Dialog>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>History</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* <button className="w-fit px-4 py-1 border text-red-400 border-red-400 mt-2 font-semibold">
                          Archive
                        </button> */}
                      </div>
                      <p className="hidden md:block self-end text-xs text-gray-400">
                        Created at {actuallyCreatedAt}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <p className="text-xl text-gray-400 mb-4">
                  No quiz found. Click below to create one.
                </p>
                <Link
                  className="border px-4 py-2 rounded shadow font-semibold bg-gray-700 text-gray-50 hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
                  href="/generate-quiz"
                >
                  Generate Quiz
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

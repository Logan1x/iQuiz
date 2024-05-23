"use client";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useGetUser } from "@/contexts/user";
import { QuizType } from "@/types/quiz";
import { getTotalWeightageOfquiz } from "./helpers";
import Link from "next/link";
import Quiz from "../quiz/quiz";

const Dashboard: React.FC = () => {
  const { user } = useGetUser();
  const [loading, setLoading] = useState(true);
  const [batchOfQuiz, setBatchOfQuiz] = useState<Array<QuizType> | []>([]);

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
    <div className="container p-24 mx-auto relative">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <section>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col flex-wrap gap-6 mt-6">
            {batchOfQuiz.length > 0 ? (
              batchOfQuiz.map(({ id, quizzes, created_at }) => {
                const actuallyCreatedAt =
                  moment(created_at).format("DD MMMM, YYYY");

                const { topic, questions } = JSON.parse(quizzes as string);
                const totalWeightage = getTotalWeightageOfquiz(questions);

                return (
                  <div
                    key={id}
                    className="border rounded flex px-4 py-6 w-full justify-between shadow"
                  >
                    <div>
                      <p className="font-semibold text-xl">{topic}</p>
                      <div className="flex gap-2">
                        <p>{questions.length} Questions</p>
                        <p>•</p>
                        <p>Total Weightage: {totalWeightage}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button className="w-fit px-4 py-1 border mt-2 font-semibold">
                          History
                        </button>
                        <Link
                          href={`/quiz/${id}`}
                          className="w-fit px-4 py-1 border mt-2 font-semibold"
                        >
                          Play
                        </Link>
                        <button className="w-fit px-4 py-1 border text-red-400 border-red-400 mt-2 font-semibold">
                          Archive
                        </button>
                      </div>
                      <p className="self-end text-sm text-gray-400 italic">
                        created at {actuallyCreatedAt}
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

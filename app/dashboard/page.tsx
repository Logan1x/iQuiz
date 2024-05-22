"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUser } from "@/contexts/user";

type Props = {};

const Dashboard = (props: Props) => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useGetUser();

  console.log(user);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = user && (await axios.get(`/api/quizByUid?uid=${user?.id}`));

        console.log(res.data);

        setQuizzes(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    user && fetchQuizzes();
  }, [user]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Dashboard</h1>
      <section>
        <h2>Generated Quizzes</h2>
        <div className="flex gap-4">
          {quizzes.length > 0 &&
            quizzes.map((quiz) => {
              const quizData = JSON.parse(quiz.quizzes);
              return (
                <div
                  key={quiz.id}
                  className="border flex flex-col justify-between p-4 "
                >
                  <div>{quizData.topic}</div>
                  <div>{quizData.questions.length} questions</div>
                  {/* <div>{JSON.stringify(quizData)}</div> */}
                </div>
              );
            })}
        </div>
        {/* {quizzes.length > 0 && JSON.stringify(quizzes)} */}
      </section>
    </div>
  );
};

export default Dashboard;

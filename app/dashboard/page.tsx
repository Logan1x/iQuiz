"use client";
import { supabase } from "@/config/supabaseConfig";
import React, { useEffect, useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const [quizzes, setQuizzes] = useState([]);
  async function fetchData() {
    try {
      const { data, error } = await supabase.from("quizes").select();
      return data;
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function fetchQuizes() {
      const data = await fetchData();
      setQuizzes(data);
    }
    fetchQuizes();
  }, []);

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

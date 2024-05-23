"use client";
import axios from "axios";
import { useGetUser } from "@/contexts/user";
import React, { useEffect, useState } from "react";
import { QuizRecord } from "@/types/quiz";

const QuizPage = ({ params }: { params: { slug: string } }) => {
  const { user } = useGetUser();
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizRecord>();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `/api/quizById?quizId=${params.slug}&uid=${user?.id}`
          );
          const { id, created_at, history, quiz, uid } = data;
          setQuizData({ id, created_at, history, quiz: JSON.parse(quiz), uid });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user, params.slug]);

  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  const handleOptionChange = (index: number, option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let score = 0;
    if (quizData) {
      const { quiz } = quizData;
      if (quiz) {
        for (let i = 0; i < quiz.questions.length; i++) {
          if (quiz.questions[i].answer === userAnswers[i]) {
            score += quiz.questions[i].weightage;
          }
        }
      }
    }
    alert(`Your score is ${score}`);
  };

  if (loading && quizData) return <div>Loading...</div>;

  if (quizData) {
    const { quiz } = quizData;

    return (
      quizData && (
        <div className="relative p-4 w-full max-w-2xl max-h-full flex justify-center">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Quiz</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <form onSubmit={handleSubmit}>
                {quiz.questions.map((question, index) => (
                  <div
                    key={index}
                    className="text-base leading-relaxed text-gray-500 "
                  >
                    <h2>{question.question}</h2>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="radio"
                          id={`option${optionIndex}`}
                          name={`question${index}`}
                          value={option}
                          onChange={() => handleOptionChange(index, option)}
                        />
                        <label
                          htmlFor={`option${optionIndex}`}
                          className="mx-2"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b mt-4">
                  <button
                    data-modal-hide="default-modal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Submit Quiz
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    );
  }
};

export default QuizPage;

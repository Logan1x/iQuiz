import React, { useState } from "react";

type Props = {};

function Quiz() {
  //   console.log(questions);

  const questions = [
    {
      question: "Which planet is known as the 'Red Planet'?",

      options: ["Earth", "Venus", "Mars", "Jupiter"],

      answer: "Mars",

      difficulty: "easy",

      weightage: 1,
    },

    {
      question: "What is the name of the nearest galaxy to the Milky Way?",

      options: ["Andromeda", "Orion", "Whirlpool", "Triangulum"],

      answer: "Andromeda",

      difficulty: "hard",

      weightage: 2,
    },
  ];
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill(null)
  );

  const handleOptionChange = (index, option) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === userAnswers[i]) {
        score += questions[i].weightage;
      }
    }
    alert(`Your score is ${score}`);
  };

  return (
    <section className="hidden backdrop-blur-sm bg-gray-300/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full flex justify-center">
        <div className="relative bg-white rounded-lg shadow min-w-[960px] ">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 space-y-4">
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
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
                      <label htmlFor={`option${optionIndex}`} className="mx-2">
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
    </section>
  );
}

export default Quiz;

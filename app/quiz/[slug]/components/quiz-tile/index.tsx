import { Props } from "./types";
import { getTotalWeightageOfquiz } from "@/app/dashboard/helpers";

export const QuizTile = (props: Props) => {
  const {
    topic,
    questions,
    quizPlayDispatch,
    userResponses,
    activeQuestionIndex,
  } = props;

  const numberFormatter = (number: number) => {
    return number.toString().padStart(2, "0");
  };

  const handleSubmit = (e: React.FormEvent) => {
    quizPlayDispatch({
      type: "SET_USER_SCORE",
      payload: { userResponses, questions },
    });
  };

  const maxNoOfQuestions = questions.length;
  const options = questions[activeQuestionIndex].options;
  const totalWeightage = getTotalWeightageOfquiz(questions);
  const currentQuestion = questions[activeQuestionIndex].question;
  const currentQuestionDifficulty = questions[activeQuestionIndex].difficulty;
  const currentQuestionWeightage = questions[activeQuestionIndex].weightage;

  return (
    <div className="border rounded-sm w-2/4 p-8">
      <div className="flex items-center gap-4">
        <h2 className="text-5xl font-bold">{topic}</h2>
        <div className="flex gap-2">
          <div className="px-2 py-1 border rounded">
            Total questions: {maxNoOfQuestions}
          </div>
          <div className="px-2 py-1 border rounded">
            Weightage: {totalWeightage}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="px-3 py-1 border rounded bg-gray-400 text-white">
          Current question: {numberFormatter(activeQuestionIndex + 1)}
        </div>
        <div className="px-3 py-1 border rounded bg-gray-400 text-white">
          Difficulty: {currentQuestionDifficulty}
        </div>
        <div className="px-2 py-1 border rounded bg-gray-400 text-white">
          Current question weightage:{" "}
          {numberFormatter(currentQuestionWeightage)}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-2xl font-semibold h-12">{currentQuestion}</p>
        <div className="flex flex-col gap-2 justify-start p-4">
          {options.map((option, _) => (
            <section key={option} className="flex gap-2 items-center">
              <input
                id={`option${_}`}
                name="options"
                value={option}
                type="radio"
                className="w-4 h-4"
                checked={userResponses[activeQuestionIndex] === option}
                onChange={() =>
                  quizPlayDispatch({
                    type: "SET_USER_ANSWER",
                    payload: { index: activeQuestionIndex, answer: option },
                  })
                }
              />
              <label htmlFor={`option${_}`} className="text-xl">
                {option}
              </label>
            </section>
          ))}
          <div className="flex gap-2 w-full justify-center">
            <button
              className="disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 font-semibold px-4 py-1 bg-none border border-gray-200 text-black rounded"
              onClick={() =>
                activeQuestionIndex - 1 >= 0 &&
                quizPlayDispatch({ type: "PREV_QUESTION" })
              }
              disabled={activeQuestionIndex - 1 < 0}
            >
              Previous
            </button>
            {Number(activeQuestionIndex) < maxNoOfQuestions - 1 ? (
              <button
                className="font-semibold px-4 py-1 bg-black text-white rounded"
                onClick={() => quizPlayDispatch({ type: "NEXT_QUESTION" })}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="font-semibold px-4 py-1 rounded bg-amber-400 text-black"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import axios from "axios";
import { useGetUser } from "@/contexts/user";
import { useEffect, useReducer } from "react";
import { QuizTile } from "./components/quiz-tile";
import QuickResult from "./components/quick-result";
import { initState, quizPlayReducer } from "./reducers/quiz-play-reducer";
import { getTotalWeightageOfquiz } from "@/app/dashboard/helpers";

const QuizPage = ({ params }: { params: { slug: string } }) => {
  const { user } = useGetUser();
  const [state, dispatch] = useReducer(quizPlayReducer, initState);

  const { loading, quizRecord, activeQuestionIndex, userResponses, score } =
    state;

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          dispatch({ type: "TOGGLE_LOADER" });
          const { data } = await axios.get(
            `/api/quizById?quizId=${params.slug}&uid=${user.id}`
          );
          const { id, created_at, history, quiz, uid } = data;
          const res = { id, created_at, history, quiz: JSON.parse(quiz), uid };
          dispatch({ type: "SET_QUIZ_RECORD", payload: res });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user, params.slug]);

  if (loading && !quizRecord) return <div>Loading...</div>;

  if (quizRecord) {
    const {
      quiz: { topic, questions },
    } = quizRecord;

    const quizTileProps = {
      topic,
      questions,
      activeQuestionIndex,
      quizPlayDispatch: dispatch,
      userResponses,
    };
    const totalWeightage = getTotalWeightageOfquiz(questions);

    return (
      <div className="flex mt-6 justify-center p-4 md:p-24 ">
        {score ? (
          <QuickResult totalWeightage={totalWeightage} score={score} />
        ) : (
          <QuizTile {...quizTileProps} />
        )}
      </div>
    );
  }

  return null;
};

export default QuizPage;

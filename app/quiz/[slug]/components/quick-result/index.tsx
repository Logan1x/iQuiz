import { Props } from "./types";

const QuickResult = (props: Props) => {
  const { score, totalWeightage } = props;
  return (
    <div className="border rounded-sm w-2/4 p-8 flex flex-col gap-4 items-center justify-center">
      <p className="text-2xl font-semibold">
        You scored {score}/{totalWeightage}. Congrats!
      </p>
      <div className="flex items-center gap-2">
        <button className="font-semibold px-4 py-1 bg-black text-white rounded">
          Play another Quiz
        </button>
        <button className="font-semibold px-4 py-1 bg-black text-white rounded">
          View answers
        </button>
      </div>
    </div>
  );
};

export default QuickResult;

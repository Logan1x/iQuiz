import Link from "next/link";
import { Props } from "./types";

const QuickResult = (props: Props) => {
  const { score, totalWeightage } = props;
  return (
    <div className="border rounded-sm md:w-2/4 p-8 flex flex-col gap-4 items-center justify-center">
      <p className="text-2xl font-semibold">
        You scored {score}/{totalWeightage}. Congrats!
      </p>
      <div className="flex items-center gap-2">
        <Link
          className="border px-4 py-2 rounded shadow font-semibold bg-gray-700 text-gray-50 hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
          href={"/dashboard"}
        >
          Play another Quiz
        </Link>
        {/* <button
          className="font-semibold px-4 py-1 bg-black text-white rounded cursor-not-allowed"
          disabled
        >
          View answers
        </button> */}
      </div>
    </div>
  );
};

export default QuickResult;

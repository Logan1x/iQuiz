import { Question } from "@/types/quiz";

export const getTotalWeightageOfquiz = (questions: Array<Question>) => {
  return questions.reduce((curr, prev) => curr + prev.weightage, 0);
};

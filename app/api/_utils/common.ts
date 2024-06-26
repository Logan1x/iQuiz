import OpenAI from "openai";
import { supabase } from "@/config/supabaseConfig";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

export async function generateQuiz(
  quizTopic: string,
  quizDescription: string,
  noOfQuestionsToGenerate: number = 5
) {
  if (noOfQuestionsToGenerate === 0) noOfQuestionsToGenerate = 5;
  const prompt = `
    You are a world-renowned professor known for creating highly educational and engaging quizzes. Your task is to generate a set of quiz questions
    based on the given topic and description. Each question should be well-crafted to test the knowledge of students comprehensively and should
    adhere to the following guidelines:

    1. Each question must have exactly four answer options.
    2. Clearly specify the correct answer for each question.
    3. Indicate the difficulty level of each question as either 'easy' or 'hard'.
    4. Assign a weightage to each question: 1 for easy questions and 2 for hard questions.
    5. Ensure the questions are diverse and cover different aspects of the topic.

    You will be provided with the topic, a brief description, and the number of questions to generate. If the description is an empty string,
    base your questions solely on the topic.

    Here are the user input values:
    '''
    Topic: ${quizTopic}
    Description: ${quizDescription}
    Number of questions to generate: ${noOfQuestionsToGenerate}
    '''

    Generate a JSON response following this structure:
    '''
    interface QuizQuestion {{
      topic: string;
      questions: Question[];
    }}

    interface Question {{
      question: string;
      options: string[];
      answer: string;
      difficulty: 'easy' | 'hard';
      weightage: number;
    }}
    '''

    Ensure the generated questions are accurate, clear, and relevant to the topic. The questions should challenge the knowledge of the students and
    encourage critical thinking. Provide a balanced mix of easy and hard questions.
    `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion.choices[0].message.content;
}

export async function createQuiz(res: string, uid: string) {
  try {
    const { error } = await supabase
      .from("quizes")
      .insert([{ quiz: res, uid, archived: false }])
      .select();

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getQuizById(quizId: string, uid: string) {
  try {
    const { data, error } = await supabase
      .from("quizes")
      .select()
      .eq("id", quizId)
      .eq("uid", uid)
      .eq("archived", false);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getQuizzes(uid: string) {
  try {
    const { data, error } = await supabase
      .from("quizes")
      .select()
      .eq("uid", uid)
      .eq("archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getQuizHistory(quizId: string) {
  try {
    const { data, error } = await supabase
      .from("history")
      .select()
      .eq("quizId", quizId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function postQuizHistory(
  quizId: string,
  uid: string,
  score: number,
  userName: string,
  userAvatar: string
) {
  try {
    const { data, error } = await supabase
      .from("history")
      .insert([
        { quizId, score, uid, user_name: userName, user_avatar: userAvatar },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function archiveQuiz(quizId: string, uid: string) {
  try {
    const { data, error } = await supabase
      .from("quizes")
      .select("id, uid")
      .eq("id", quizId)
      .single();

    if (error) throw error;

    if (data.uid === uid) {
      const { error: updateError } = await supabase
        .from("quizes")
        .update({ archived: true })
        .eq("id", quizId);

      if (updateError) throw updateError;

      return { success: true };
    } else {
      throw new Error(
        "Operation cancelled: the user attempting to archive the quiz is not the creator."
      );
    }
  } catch (error) {}
}

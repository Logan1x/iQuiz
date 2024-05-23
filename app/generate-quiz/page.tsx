"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/contexts/user";
import { supabase } from "@/config/supabaseConfig";

const GenerateQuiz = () => {
  const { user, onSignOut } = useGetUser();

  const [loading, setLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    noOfQuestionsToGenerate: 0,
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { topic, description, noOfQuestionsToGenerate } = formData;
      const { data } = await axios.post("/api/generate", {
        quizTopic: topic,
        quizDescription: description,
        noOfQuestionsToGenerate: noOfQuestionsToGenerate,
        uid: user?.id,
      });

      setGeneratedQuiz(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen  py-24 w-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>
            Loading <span className="animate-ping">...</span>
          </p>
        </div>
      ) : (
        <section className="flex flex-col w-full  items-center gap-4 ">
          <h1 className="text-2xl font-bold">Generate Quiz</h1>

          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-4 w-full md:w-3/5 justify-center items-center h-32 rounded py-24 mt-6"
          >
            <input
              name="topic"
              placeholder="Topic"
              className="w-2/3 border p-2"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
            />
            <input
              name="noOfQuestionsToGenerate"
              placeholder="No of Questions to Generate"
              className="w-2/3 border p-2"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="block w-2/3 border p-2 min-h-20"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
            />
            <button
              type="submit"
              className="border px-4 py-2 rounded shadow font-semibold bg-gray-700 text-gray-50 hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
            >
              Generate
            </button>
          </form>
          <div className="mt-12">
            <button onClick={() => onSignOut()}>Sign Out</button>
          </div>
          <div className="mt-4">
            {generatedQuiz && JSON.stringify(generatedQuiz, null, 2)}
          </div>
        </section>
      )}
    </main>
  );
};

export default GenerateQuiz;

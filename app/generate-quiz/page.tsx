"use client";
import axios from "axios";
import React, { useState } from "react";

const GenerateQuiz = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    noOfQuestionsToGenerate: 0,
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { topic, description, noOfQuestionsToGenerate } = formData;
      const res = await axios.post("/api/generate", {
        quizTopic: topic,
        quizDescription: description,
        noOfQuestionsToGenerate: noOfQuestionsToGenerate,
      });

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-2xl font-bold">Generate Quiz</h1>

      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 w-3/5 justify-center items-center h-32 rounded p-24 mt-6"
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
          className="w-2/3 border p-2"
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
          }}
        />
        <button type="submit" className="border px-2 py-1 font-semibold">
          Generate
        </button>
      </form>
    </section>
  );
};

export default GenerateQuiz;

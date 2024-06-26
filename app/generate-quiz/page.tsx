"use client";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useGetUser } from "@/contexts/user";
import { AlertTitle, AlertDescription, Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const MaxNoOfQuesAlert = () => {
  return (
    <Alert variant="destructive" className="w-fit">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>Max number of questions can be 20.</p>
        <p>
          If you need more, reach out to us by clicking on chat icon in bottom
          right {":)"}
        </p>
      </AlertDescription>
    </Alert>
  );
};

const GenerateQuiz = () => {
  const { user } = useGetUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      router.push("/dashboard");
    }
  };

  useLayoutEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  return (
    <section className="py-6 md:py-24 w-full">
      {loading ? (
        <div className="flex justify-center items-center">
          <p>
            Loading <span className="animate-ping">...</span>
          </p>
        </div>
      ) : (
        <section className="flex flex-col w-full items-center gap-4 ">
          <h1 className="text-2xl font-bold">Generate Quiz</h1>

          {showAlert && <MaxNoOfQuesAlert />}
          <form
            autoComplete="off"
            onSubmit={submitHandler}
            className="md:border flex flex-col gap-4 w-full md:w-3/5 justify-center items-center rounded py-6 md:py-24 px-2 "
          >
            <input
              name="topic"
              placeholder="Topic (required)"
              className="w-2/3 border p-2"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              required
            />
            <input
              name="noOfQuestionsToGenerate"
              placeholder="No of Questions to Generate"
              className={
                showAlert
                  ? "w-2/3 border border-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2"
                  : "w-2/3 border p-2"
              }
              onChange={(e) => {
                setShowAlert(false);
                const { name, value } = e.target;
                Number(value) > 20
                  ? setShowAlert(true)
                  : setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              type="number"
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
        </section>
      )}
    </section>
  );
};

export default GenerateQuiz;

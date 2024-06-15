import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import Image from "next/image";

interface Props {
  qid: string;
  totalWeightage: number;
}

interface HistoryProps {
  user_name: string;
  score: number;
  user_avatar: string;
  uid: string;
  created_at: Date;
}

const HistoryDialog = ({ qid, totalWeightage }: Props) => {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/quizHistory?qid=${qid}`);
        setQuizHistory(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl">Quiz History</DialogTitle>
        <DialogDescription>
          {quizHistory.length > 0 ? (
            <>
              {" "}
              <div className="flex flex-col gap-2 mt-2">
                {quizHistory.map((history: HistoryProps, index: number) => (
                  <div
                    className=" rounded shadow flex justify-between p-2 items-center"
                    key={index}
                  >
                    <Image
                      src={history.user_avatar}
                      alt="user avatar"
                      width={45}
                      height={45}
                      className="rounded-full object-cover w-10 h-10 border-2 border-gray-200"
                    />
                    <div className="flex flex-col items-end">
                      <div className="text-lg">
                        <span className="text-4xl font-semibold">
                          {history.score}
                        </span>
                        /{totalWeightage}
                      </div>
                      <div className="text-xs text-gray-400">
                        {
                          new Date(history.created_at)
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No history found. Lets make history!!</p>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default HistoryDialog;

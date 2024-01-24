"use client";

import { useEffect, useState } from "react";
import Container from "~/components/common/container";
import Questionnaire from "~/components/pages/questionnaire";
import { type QuestionsFetchReturnType } from "~/lib/types/questions";

export default function QuestionnairePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<QuestionsFetchReturnType[]>([]);

  useEffect(() => {
    void fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data as QuestionsFetchReturnType[]);
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <div className="mb-10 w-full">
        <h1 className="-mb-1 text-[30px] font-semibold">Information</h1>
        <p className="text-sm text-slate-500">
          Please fill out your company information below
        </p>
        <hr className="mt-2" />
      </div>
      <Questionnaire />
    </Container>
  );
}

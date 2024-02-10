"use client";

import { useEffect, useState } from "react";
import Container from "../../common/container";
import { LoadingPage } from "../../common/loading-spinner";
import { type AllQuestionnairesType } from "~/lib/types/questionnaire";
import QuestionnaireHeader from "../questionnaire/header";
import DashboardItem from "./item";

export default function DashboardList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AllQuestionnairesType[]>([]);

  useEffect(() => {
    setLoading(true);
    void fetch("/api/questionnaire/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: AllQuestionnairesType[]) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="flex h-[84vh] flex-col items-center justify-center">
          <LoadingPage />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <QuestionnaireHeader
        label={`You have completed ${data.length} questionnaires`}
        title="Your questionnaires"
      />
      {data && data.length > 0 && (
        <div className="flex max-h-[70vh]  min-h-[70vh] flex-col gap-4 overflow-y-auto">
          {data.map((question: AllQuestionnairesType) => (
            <DashboardItem key={question.id} question={question} />
          ))}
        </div>
      )}
    </Container>
  );
}

"use client";

import { useEffect, useState } from "react";
import Container from "../common/container";
import { LoadingPage } from "../common/loading-spinner";
import { type AllQuestionnairesType } from "~/lib/types/questionnaire";
import { ChevronRight } from "lucide-react";
import QuestionnaireHeader from "./questionnaire/header";

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
        <LoadingPage />
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
        <div className="flex max-h-[70vh] min-h-[70vh] flex-col gap-4 overflow-y-auto">
          {data.map((quest: AllQuestionnairesType) => (
            <div
              className="flex cursor-pointer items-center justify-between rounded-lg border p-2 hover:bg-slate-100"
              key={quest.id}
            >
              <div>
                <div className="flex">
                  <h1 className="font-bold">{quest.companyName}</h1>
                  {/* <p className="ml-2 mt-[3px] text-sm text-gray-600">
                    {quest._count.answers} answered
                  </p> */}
                </div>
                <p className="text-sm text-gray-600">
                  Submitted {new Date(quest.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

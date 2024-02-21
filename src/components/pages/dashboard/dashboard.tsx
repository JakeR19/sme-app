"use client";

import { useEffect, useState } from "react";
import Container from "../../common/container";
import { LoadingPage } from "../../common/loading-spinner";
import { type AllQuestionnairesType } from "~/lib/types/questionnaire";
import QuestionnaireHeader from "../questionnaire/header";
import DashboardItem from "./item";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

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
      <QuestionnaireHeader title="Your questionnaires" />
      {/* if there is data render list, else render call to action */}
      {data && data.length > 0 ? (
        <div className="flex max-h-[70vh] min-h-[70vh] flex-col gap-4 overflow-y-auto">
          {data.map((question: AllQuestionnairesType, index) => {
            // reverse the index so that newest item is highest index
            const reversedIdx = data.length - 1 - index;
            // get previous questionnaire
            const prev = data[index + 1];
            return (
              <DashboardItem
                prevRating={prev?.totalRiskRating}
                index={reversedIdx + 1}
                key={question.id}
                question={question}
              />
            );
          })}
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center text-center">
          <h1 className="-mt-[60px] text-xl font-semibold text-slate-600">
            You have not completed any questionnaires.
          </h1>
          <Link href={"/questionnaire"} className="mt-4">
            <Button size={"sm"}>Go to questionnaire</Button>
          </Link>
        </div>
      ) : null}
    </Container>
  );
}

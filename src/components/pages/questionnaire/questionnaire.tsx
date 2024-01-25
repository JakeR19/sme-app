"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { type QuestionsFetchReturnType } from "~/lib/types/questions";
import InformationStep from "./information-step";
import QuestionnaireHeader from "./header";
import QuestionSteps from "./question-steps";

export default function Questionnaire() {
  const [answers, setAnswers] = useState<
    Array<{
      answer: string;
      weight: number;
      questionId: string;
    }>
  >([]);
  const [companyInformation, setCompanyInformation] = useState({
    companyName: "",
    sector: "",
  });
  const [index, setIndex] = useState<number>(0);

  const [data, setData] = useState<QuestionsFetchReturnType[]>([]);

  useEffect(() => {
    void fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setData(data as QuestionsFetchReturnType[]);
      });
  }, []);

  // get all possible page types, i.e. data assets and system assets
  // initialise first empty step for information step
  const pageNames = [""].concat(
    Array.from(new Set<string>(data.map((d) => d.page))),
  );

  function handleCompanyInformationChange(name: string, value: string) {
    setCompanyInformation({
      ...companyInformation,
      [name]: value,
    });
  }

  // this function will group the questions by the page and type
  // i.e. the output will look like this
  // { Data Assets:
  //   {
  //      General Data: [array of questions]
  //   }
  // }
  const groupedQuestions: Record<
    string,
    Record<string, QuestionsFetchReturnType[]>
  > = {};

  data.forEach((question) => {
    const { page, type } = question;
    // if page doesnt exist
    if (!groupedQuestions[page]) {
      groupedQuestions[page] = {};
    }
    // if type doesnt exist on page
    if (!groupedQuestions[page]![type]) {
      groupedQuestions[page]![type] = [];
    }
    // else we push the question to the page->type obj
    groupedQuestions[page]?.[type]!.push(question);
  });

  const isFirstIndex = index === 0;

  return (
    <div className="flex min-h-[600px] flex-col justify-between">
      <div>
        <QuestionnaireHeader
          title={isFirstIndex ? "Information" : pageNames[index]!}
          label={
            isFirstIndex
              ? "Please fill out your company information below"
              : undefined
          }
        />
        {/* if index is not 0, proceed with questions */}
        {!isFirstIndex && (
          <QuestionSteps
            groupedQuestions={groupedQuestions}
            pageNames={pageNames}
            index={index}
          />
        )}
        {/* if index is 0, show information step */}
        {isFirstIndex && (
          <InformationStep onChange={handleCompanyInformationChange} />
        )}
      </div>
      {/* if index is greater than 0 show back btn */}
      {/* if index is not 3 show next btn*/}
      <div className="mt-auto flex justify-between">
        {index > 0 ? (
          <Button onClick={() => index >= 1 && setIndex((index) => index - 1)}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {index !== 3 && (
          <Button onClick={() => index < 3 && setIndex((index) => index + 1)}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

import { type QuestionsFetchReturnType } from "~/lib/types/questions";
import InformationStep from "./information-step";
import QuestionnaireHeader from "./header";
import QuestionSteps from "./question-steps";
import QuestionnaireSteppers from "./questionnaire-steppers";
import type { AnswerHandleChangeType, AnswersType } from "~/lib/types/answers";

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Array<AnswersType>>([]);
  const [companyInformation, setCompanyInformation] = useState({
    companyName: "",
    sector: "",
  });
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<QuestionsFetchReturnType[]>([]);

  useEffect(() => {
    void fetch("/api/questions", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: QuestionsFetchReturnType[]) => {
        setData(data);
      });
  }, []);

  // get all possible page types, i.e. data assets and system assets
  // initialise first empty step for information step
  const pageNames = useMemo(
    () => [""].concat(Array.from(new Set<string>(data.map((d) => d.page)))),
    [data],
  );

  function handleCompanyInformationChange(name: string, value: string) {
    setCompanyInformation({
      ...companyInformation,
      [name]: value,
    });
  }

  // on change handler for the radio buttons
  const handleChange = ({
    answerWeight,
    questionId,
    questionWeight,
    value,
  }: AnswerHandleChangeType) => {
    // check if answer already exists in state
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === questionId,
    );

    // if exists, update, else create new
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        questionId,
        questionWeight,
        answer: value,
        answerWeight,
      };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([
        ...answers,
        {
          questionId,
          questionWeight,
          answer: value,
          answerWeight,
        },
      ]);
    }
  };

  const submitQuestionnaire = () => {
    void fetch("/api/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyInformation, answers }),
    });
  };

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

  const isFirstIndex = useMemo(() => index === 0, [index]);

  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      <div className="overflow-y-auto">
        <QuestionnaireHeader
          title={isFirstIndex ? "Information" : pageNames[index]!}
          label={
            isFirstIndex
              ? "Please fill out your company information below"
              : undefined
          }
        />
        <div className="max-h-[60vh] min-h-[60vh] overflow-y-auto">
          <div className="mb-5">
            {/* if index is not 0, proceed with questions */}
            {!isFirstIndex && (
              <QuestionSteps
                answers={answers}
                handleChange={handleChange}
                groupedQuestions={groupedQuestions}
                pageNames={pageNames}
                index={index}
              />
            )}
            {/* if index is 0, show information step */}
            {isFirstIndex && (
              <InformationStep
                companyNameValue={companyInformation.companyName}
                companySectorValue={companyInformation.sector}
                onChange={handleCompanyInformationChange}
              />
            )}
          </div>
          {/* if index is greater than 0 show back btn */}
          {/* if index is not 3 show next btn*/}
        </div>
      </div>
      <QuestionnaireSteppers
        submitCallback={submitQuestionnaire}
        disabled={
          companyInformation.companyName === "" ||
          companyInformation.sector === ""
        }
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  type GPTLikelihoodResponseType,
  type QuestionsFetchReturnType,
} from "~/lib/types/questions";
import InformationStep from "./information-step";
import QuestionnaireHeader from "./header";
import QuestionSteps from "./question-steps";
import QuestionnaireSteppers from "./questionnaire-steppers";
import type { AnswerHandleChangeType, AnswersType } from "~/lib/types/answers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingPage } from "~/components/common/loading-spinner";
import { riskCalculationAlgo } from "~/lib/utils";
import { tempLikelihoods } from "~/lib/constants";

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Array<AnswersType>>([]);
  const [companyInformation, setCompanyInformation] = useState({
    companyName: "",
    sector: "",
  });
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<QuestionsFetchReturnType[]>([]);
  const [loading, setLoading] = useState<"questions" | "ai" | "submit" | null>(
    "questions",
  );
  const [likelihoods, setLikelihoods] =
    useState<GPTLikelihoodResponseType[]>(tempLikelihoods);
  const [threats, setThreats] = useState<string[]>([]);
  // check to see if gpt api request has begun
  // prevents refiring of api request if user decides to step back to first step
  const [hasStartedGPTFetch, setHasStartGPTFetch] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // fetch all questions from db
    void fetch("/api/questions", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: QuestionsFetchReturnType[]) => {
        setData(data);
        setLoading(null);
      });
  }, []);

  // get all possible page types, i.e. data assets and system assets
  // initialise first empty step for information step with [""]
  const pageNames = useMemo(
    () => [""].concat(Array.from(new Set<string>(data.map((d) => d.page)))),
    [data],
  );

  // change handler for company information
  function handleCompanyInformationChange(name: string, value: string) {
    setCompanyInformation({
      ...companyInformation,
      [name]: value,
    });
  }

  // on change handler for the radio buttons
  const handleChange = ({ ...params }: AnswerHandleChangeType) => {
    // check if answer already exists in state
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === params.questionId,
    );

    // if exists, update, else create new
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        ...params,
        answer: params.value,
      };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([
        ...answers,
        {
          ...params,
          answer: params.value,
        },
      ]);
    }
  };

  const submitQuestionnaire = () => {
    // submit questionnaire api call
    setLoading("submit");
    void fetch("/api/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyInformation,
        threats,
        answers: answers.map((answer) => {
          // find corresponding likelihood value
          const likelihood = likelihoods.find(
            (l) => l.id === answer.questionId,
          );
          // destructure title to separate from answer obj
          const { title, ...rest } = answer;
          return {
            ...rest,
            likelihood: likelihood?.likelihood,
            threat: likelihood?.threat,
            // send answer along with calculation to api route
            calculation: Math.round(
              riskCalculationAlgo({
                answerWeight: answer.answerWeight,
                questionWeight: answer.questionWeight,
                likelihood: likelihood?.likelihood ?? 0,
              }),
            ),
          };
        }),
      }),
    })
      .then((res) => res.json())
      .then((data: { id: string; createdAt: Date }) => {
        setLoading(null);
        toast.success("Submitted questionnaire, redirecting...");
        setTimeout(() => {
          void router.push(`/report/${data.id}`);
        }, 1500);
      });
  };

  const getGPTLikelihoodValues = () => {
    // call api to interface with chatgpt and
    // get likelihood factor for each question
    if (!hasStartedGPTFetch) {
      setHasStartGPTFetch(true);
      void fetch("/api/questions/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sector: companyInformation.sector,
          questions: data.map((d) => {
            return {
              id: d.id,
              title: d.title,
            };
          }),
        }),
      })
        .then((res) => res.json())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((gptData: any) => {
          // parse data from chatgpt into obj that can be manipulated
          const parsedLikelihoods = JSON.parse(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
            gptData.gptResponse.choices[0].message.content,
          ) as GPTLikelihoodResponseType[];
          const threats = gptData.parsedThreats as string[];
          setThreats(threats);
          setLikelihoods(parsedLikelihoods);
          setLoading(null);
        });
    }
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
    // if page doesnt exist initialise as new obj
    if (!groupedQuestions[page]) {
      groupedQuestions[page] = {};
    }
    // if type doesnt exist on page initialise as new array
    if (!groupedQuestions[page]![type]) {
      groupedQuestions[page]![type] = [];
    }
    // else we push the question to the page->type obj
    groupedQuestions[page]?.[type]!.push(question);
  });

  // check if current page is index 0 (information step)
  // better to make it as reusable var
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
        <>
          {loading === "questions" ? (
            <div className="flex h-[64vh] flex-col items-center justify-center">
              <LoadingPage />
              <p className="mt-2 text-sm text-slate-600">
                Fetching questions...
              </p>
            </div>
          ) : (
            <div className="max-h-[64vh] min-h-[64vh] overflow-y-auto">
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
            </div>
          )}
        </>
      </div>
      <QuestionnaireSteppers
        isLoading={loading === "submit"}
        // gptResponseCallback={() => null}
        gptResponseCallback={getGPTLikelihoodValues}
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

import { type QuestionsFetchReturnType } from "~/lib/types/questions";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import Question from "./question";
import type { AnswerHandleChangeType, AnswersType } from "~/lib/types/answers";

export default function QuestionSteps({
  groupedQuestions,
  pageNames,
  index,
  handleChange,
  answers,
}: {
  groupedQuestions: Record<string, Record<string, QuestionsFetchReturnType[]>>;
  pageNames: string[];
  index: number;
  handleChange: ({ ...params }: AnswerHandleChangeType) => void;
  answers: AnswersType[];
}) {
  return (
    <div>
      {groupedQuestions[pageNames[index]!] && (
        <div className="space-y-5">
          {Object.entries(groupedQuestions[pageNames[index]!]!).map(
            ([type, questions]) => {
              // count how many questions have been answers per group
              const questionCount = questions.filter((question) =>
                answers.some((answer) => answer.questionId === question.id),
              ).length;
              return (
                <Accordion allowMultiple className="mb-5 rounded-lg" key={type}>
                  <AccordionItem
                    className="rounded-lg border-l border-r"
                    key={type}
                  >
                    <div>
                      <AccordionButton className="flex justify-between">
                        <h3 className="font-semibold">{type}</h3>
                        <p className="font-semibold">
                          {questionCount}/{questions.length}
                        </p>
                      </AccordionButton>
                      <AccordionPanel>
                        <div className="space-y-2">
                          {questions.map((question) => (
                            <Question
                              answers={answers}
                              handleChange={handleChange}
                              question={question}
                              key={question.id}
                            />
                          ))}
                        </div>
                      </AccordionPanel>
                    </div>
                  </AccordionItem>
                </Accordion>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}

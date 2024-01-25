import { type QuestionsFetchReturnType } from "~/lib/types/questions";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import Question from "./question";

export default function QuestionSteps({
  groupedQuestions,
  pageNames,
  index,
}: {
  groupedQuestions: Record<string, Record<string, QuestionsFetchReturnType[]>>;
  pageNames: string[];
  index: number;
}) {
  return (
    <div>
      {groupedQuestions[pageNames[index]!] && (
        <div className="space-y-5">
          {Object.entries(groupedQuestions[pageNames[index]!]!).map(
            ([type, questions]) => (
              <Accordion
                allowMultiple
                allowToggle
                className="mb-5 rounded-lg"
                key={type}
              >
                <AccordionItem
                  className="rounded-lg border-l border-r"
                  key={type}
                >
                  <div>
                    <AccordionButton className="flex justify-between">
                      <h3 className="font-semibold">{type}</h3>
                      {questions.length}
                    </AccordionButton>
                    <AccordionPanel>
                      <div className="space-y-2">
                        {questions.map((question) => (
                          <Question question={question} key={question.id} />
                        ))}
                      </div>
                    </AccordionPanel>
                  </div>
                </AccordionItem>
              </Accordion>
            ),
          )}
        </div>
      )}
    </div>
  );
}

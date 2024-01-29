import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import { type QuestionsFetchReturnType } from "~/lib/types/questions";

export default function Question({
  question,
  handleChange,
  answers,
}: {
  question: QuestionsFetchReturnType;
  handleChange: (questionId: string, value: string) => void;
  answers: {
    answer: string;
    weight: number;
    questionId: string;
  }[];
}) {
  return (
    <div
      className="flex justify-between  rounded-md border px-4 py-2"
      key={question.id}
    >
      <p className="my-auto max-w-[60%] items-center text-sm">
        {question.title}
      </p>
      <RadioGroup
        onChange={(value) => handleChange(question.id, value)}
        className="my-auto items-center"
        value={answers.find((a) => a.questionId === question.id)?.answer ?? ""}
      >
        <Stack direction="row">
          <Radio value="yes">
            <p className="text-sm">Yes</p>
          </Radio>
          <Radio value="partially">
            <p className="text-sm">Partially</p>
          </Radio>
          <Radio value="no">
            <p className="text-sm">No</p>
          </Radio>
        </Stack>
      </RadioGroup>
    </div>
  );
}

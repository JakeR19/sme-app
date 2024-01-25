import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

import { type QuestionsFetchReturnType } from "~/lib/types/questions";

export default function Question({
  question,
}: {
  question: QuestionsFetchReturnType;
}) {
  return (
    <div
      className="flex justify-between  rounded-md border px-4 py-2"
      key={question.id}
    >
      <p className="my-auto max-w-[60%] items-center">{question.title}</p>
      <RadioGroup
        className="my-auto items-center"
        onChange={() => null}
        value={""}
      >
        <Stack direction="row">
          <Radio value="1">Yes</Radio>
          <Radio value="2">Partially</Radio>
          <Radio value="3">No</Radio>
        </Stack>
      </RadioGroup>
    </div>
  );
}

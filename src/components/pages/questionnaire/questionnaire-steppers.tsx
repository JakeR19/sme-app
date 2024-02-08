import { Button } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

export default function QuestionnaireSteppers({
  index,
  setIndex,
  disabled,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  disabled: boolean;
}) {
  return (
    <div
      id="buttons"
      className="mb-[50px] flex justify-between border-t pt-[10px]"
    >
      {index > 0 ? (
        <Button
          variant="outline"
          fontSize={"small"}
          onClick={() => index >= 1 && setIndex((index) => index - 1)}
        >
          Back
        </Button>
      ) : (
        <div />
      )}
      {index !== 3 && (
        <Button
          variant="outline"
          fontSize={"small"}
          isDisabled={disabled}
          onClick={() => index < 3 && setIndex((index) => index + 1)}
        >
          Next
        </Button>
      )}
      {index === 3 && (
        <Button
          variant="outline"
          fontSize={"small"}
          onClick={() => {
            void fetch("/api/questions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ test: "hello" }),
            });
          }}
        >
          Submit
        </Button>
      )}
    </div>
  );
}

import { Button } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

export default function QuestionnaireSteppers({
  index,
  setIndex,
  disabled,
  submitCallback,
  gptResponseCallback,
  isLoading,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  submitCallback: () => void;
  gptResponseCallback: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      id="buttons"
      className="flex items-center justify-between border-t pt-[10px]"
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
          onClick={() => {
            if (index === 0) {
              gptResponseCallback();
            }
            index < 3 && setIndex((index) => index + 1);
          }}
        >
          Next
        </Button>
      )}
      {index === 3 && (
        <Button
          isLoading={isLoading}
          variant="outline"
          fontSize={"small"}
          onClick={submitCallback}
        >
          Submit
        </Button>
      )}
    </div>
  );
}

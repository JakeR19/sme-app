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
      {/* if current step is greater than index 0 show back button */}
      {index > 0 ? (
        <Button
          _hover={{
            bgColor: "gray.700",
          }}
          bgColor={"#000000"}
          color="white"
          fontSize={"small"}
          onClick={() => index >= 1 && setIndex((index) => index - 1)}
        >
          Back
        </Button>
      ) : (
        <div />
      )}
      {/* if current step is not index 3 show next button*/}
      {index !== 3 && (
        <Button
          _hover={{
            bgColor: "gray.700",
          }}
          bgColor={"#000000"}
          color="white"
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
      {/* if index 3 show submit button */}
      {index === 3 && (
        <Button
          _hover={{
            bgColor: "gray.700",
          }}
          bgColor={"#000000"}
          color="white"
          isLoading={isLoading}
          fontSize={"small"}
          onClick={submitCallback}
        >
          Submit
        </Button>
      )}
    </div>
  );
}

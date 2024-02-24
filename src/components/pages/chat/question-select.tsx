import type { Dispatch, SetStateAction } from "react";
import LoadingSpinner from "~/components/common/loading-spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type QuestionsFetchReturnType } from "~/lib/types/questions";

export default function QuestionSelect({
  loading,
  groupedQuestions,
  chosenQuestion,
  setChosenQuestion,
}: {
  loading: boolean;
  groupedQuestions: Record<string, Record<string, QuestionsFetchReturnType[]>>;
  chosenQuestion: string;
  setChosenQuestion: Dispatch<SetStateAction<string>>;
}) {
  if (loading) {
    return (
      <div className="my-4 flex w-full items-center justify-center">
        <LoadingSpinner size={24} />
      </div>
    );
  }

  return (
    <>
      {groupedQuestions && !loading && (
        <div>
          <h1 className="mb-[2px] text-sm font-bold">Security Question</h1>
          <Select
            value={chosenQuestion}
            onValueChange={(value) => setChosenQuestion(value)}
          >
            <SelectTrigger className="text-left" id="sector">
              <SelectValue placeholder="Choose a question..." />
            </SelectTrigger>
            <SelectContent className="max-w-[700px] p-0">
              {Object.entries(groupedQuestions).map(
                // main category map
                ([category, subcategories]) => (
                  <SelectGroup key={category}>
                    <SelectLabel className="border-t bg-gray-200 text-sm">
                      <p className="-ml-4">{category}</p>
                    </SelectLabel>
                    {Object.entries(subcategories).map(
                      // sub category map
                      ([subcategory, questions]) => (
                        <SelectGroup key={subcategory}>
                          <SelectLabel className="border-y bg-gray-100 text-sm">
                            {subcategory}
                          </SelectLabel>
                          {questions.map((question) => (
                            // questions map
                            <SelectItem
                              className="max-w-[700px] text-sm"
                              value={question.title}
                              key={question.id}
                            >
                              {question.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ),
                    )}
                  </SelectGroup>
                ),
              )}
            </SelectContent>
          </Select>
          <p className="mt-[2px] text-xs text-slate-500">
            Pick a question you would like the AI to help you with.
          </p>
        </div>
      )}
    </>
  );
}

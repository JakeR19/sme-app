"use client";

import { Button, Input, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Container from "~/components/common/container";
import LoadingSpinner from "~/components/common/loading-spinner";
import QuestionnaireHeader from "~/components/pages/questionnaire/header";
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

export default function AIChatPage() {
  const [data, setData] = useState<QuestionsFetchReturnType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chosenQuestion, setChosenQuestion] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    // fetch all questions from db
    void fetch("/api/questions", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: QuestionsFetchReturnType[]) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const groupedQuestions: Record<
    string,
    Record<string, QuestionsFetchReturnType[]>
  > = {};

  data
    .filter((d) =>
      d.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    )
    .forEach((question) => {
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

  return (
    <Container>
      <QuestionnaireHeader
        title="AI Chat"
        label="Get help with with your security needs"
      />
      <div className="mx-auto flex w-full justify-center">
        <div className="max-h-[70vh] min-h-[70vh] w-[95%] space-y-5">
          {data && !loading && (
            <div>
              <h1 className="mb-[2px] text-sm font-bold">Security Question</h1>
              <Select
                value={chosenQuestion}
                name="sector"
                onValueChange={(value) => setChosenQuestion(value)}
              >
                <SelectTrigger className="text-left" id="sector">
                  <SelectValue placeholder="Choose a question..." />
                </SelectTrigger>
                <SelectContent className="max-w-[700px] p-0">
                  <div className="mb-1 w-full items-center justify-center px-2 py-1">
                    <Input
                      onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSearchText(e.target.value);
                      }}
                      placeholder="Search for a question"
                      w="680px"
                      size={"sm"}
                      borderRadius={"md"}
                    />
                  </div>
                  {Object.entries(groupedQuestions).map(
                    ([category, subcategories]) => (
                      <SelectGroup key={category}>
                        <SelectLabel className="border-t bg-gray-200 text-sm">
                          <p className="-ml-4">{category}</p>
                        </SelectLabel>
                        {Object.entries(subcategories).map(
                          ([subcategory, questions]) => (
                            <SelectGroup key={subcategory}>
                              <SelectLabel className="border-y bg-gray-100 text-sm">
                                {subcategory}
                              </SelectLabel>
                              {questions.map((question) => (
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
          <div>
            <h1 className="text-sm font-bold">Ask something extra</h1>
            <Textarea
              placeholder={`Ask something specific by typing here... (e.g. "What are the best practices I can implement in order to satisfy this question")`}
              fontSize={"14px"}
            />
          </div>
          <Button
            _hover={{
              bgColor: "gray.800",
            }}
            bgColor={"#000000"}
            color="white"
            width={"full"}
          >
            Ask AI
          </Button>
          {chosenQuestion}
        </div>
      </div>
    </Container>
  );
}

"use client";

import { Button, Textarea } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import Container from "~/components/common/container";
import QuestionnaireHeader from "~/components/pages/questionnaire/header";
import { type QuestionsFetchReturnType } from "~/lib/types/questions";
import { type Message, useChat } from "ai/react";
import LoadingSpinner from "~/components/common/loading-spinner";
import { aiChatSystemPrompt } from "~/lib/constants";
import { RefreshCcw } from "lucide-react";
import QuestionSelect from "~/components/pages/chat/question-select";

export default function AIChatPage() {
  // question data
  const [data, setData] = useState<QuestionsFetchReturnType[]>([]);
  // loading state for question loading
  const [loading, setLoading] = useState<boolean>(false);
  // users chosen question
  const [chosenQuestion, setChosenQuestion] = useState<string>("");

  // using the vercel ai sdk to stream ai response from route endpoint
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    initialMessages: [
      // initial system prompt
      {
        role: "system",
        id: "ai_help",
        content: aiChatSystemPrompt(chosenQuestion),
      },
    ],
  });

  // format messages by removing first element,
  // as first message is the system prompt
  // wrap in useMemo as we do not wish to rerun on each render
  const formattedMessages: Message[] = useMemo(() => {
    return messages.slice(1);
  }, [messages]);

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

  // format questions so we can access them by their page (i.e. data assets)
  // and then by their type
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

  const resetChat = () => {
    setChosenQuestion("");
    setMessages([]);
  };

  // bool to check if chart is started
  const startedChat = messages.length > 1;

  useEffect(() => {
    // auto scroll to bottom of div when messages are added
    const chatDiv = document.getElementById("chatDiv");
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <QuestionnaireHeader
        title="AI Chat"
        label="Get help with with your security needs"
      />
      <div className="mx-auto flex w-full justify-center">
        <div className="max-h-[70vh] min-h-[70vh] w-[95%] space-y-3">
          {!startedChat && (
            <QuestionSelect
              loading={loading}
              groupedQuestions={groupedQuestions}
              chosenQuestion={chosenQuestion}
              setChosenQuestion={setChosenQuestion}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="text-sm font-bold">Ask something extra</h1>
              <Textarea
                value={input}
                onChange={(e) => handleInputChange(e)}
                placeholder={`Ask something specific by typing here... (e.g. "What are the best practices I can implement in order to satisfy this question")`}
                fontSize={"14px"}
              />
            </div>
            <div className="mt-2 flex items-center space-x-2">
              {/* refresh chat */}
              {startedChat && (
                <Button onClick={resetChat}>
                  <RefreshCcw className="mr-1" /> Restart
                </Button>
              )}
              {/* submit question */}
              <Button
                type="submit"
                _hover={{
                  bgColor: "gray.800",
                }}
                bgColor={"#000000"}
                color="white"
                width={"full"}
              >
                {startedChat ? "Ask further" : "Ask AI"}
              </Button>
            </div>
          </form>
          {/* if started chat show question at top */}
          {startedChat && (
            <p className="text-center text-sm font-semibold">
              {chosenQuestion}
            </p>
          )}
          <div
            id="chatDiv"
            className="max-h-[38vh] space-y-2 overflow-y-auto rounded-md border bg-gray-100 p-5"
          >
            {formattedMessages.map((m) => (
              <div key={m.id}>
                <div className="whitespace-pre-wrap text-sm">
                  <p className="font-bold">
                    {m.role === "user" ? "You" : "AI"}
                  </p>
                  <p>{m.content}</p>
                </div>
              </div>
            ))}
            {/* show loading indicator when ai is responding */}
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </Container>
  );
}

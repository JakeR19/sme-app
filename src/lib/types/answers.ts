export type AnswersType = {
  answer: string;
  questionWeight: number;
  questionId: string;
  answerWeight: number;
};

export type AnswerHandleChangeType = {
  questionId: string;
  value: string;
  questionWeight: number;
  answerWeight: number;
};

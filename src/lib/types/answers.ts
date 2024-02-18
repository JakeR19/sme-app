export type AnswersType = {
  answer: string;
  questionWeight: number;
  questionId: string;
  title: string;
  answerWeight: number;
};

export type AnswerHandleChangeType = {
  questionId: string;
  title: string;
  value: string;
  questionWeight: number;
  answerWeight: number;
};

export type QuestionsFetchReturnType = {
  id: string;
  title: string;
  page: string;
  type: string;
  questionWeight: number;
  yesWeight: number;
  partiallyWeight: number;
  noWeight: number;
  likelihood?: number;
};

export type GPTLikelihoodResponseType = {
  id: string;
  threat: string;
  likelihood: number;
};

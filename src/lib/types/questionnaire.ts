export type SubmitQuestionnaireReqType = {
  companyInformation: {
    companyName: string;
    sector: string;
  };
  answers: Array<{
    questionId: string;
    questionWeight: number;
    answer: string;
    answerWeight: number;
  }>;
};

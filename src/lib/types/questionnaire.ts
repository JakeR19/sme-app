export type SubmitQuestionnaireReqType = {
  companyInformation: {
    companyName: string;
    sector: string;
  };
  answers: Array<{
    questionId: string;
    questionWeight: number;
    answer: string;
    calculation: number;
    likelihood: number;
    answerWeight: number;
    title: string;
    threat: string;
  }>;
  sector?: string;
  threats: string[];
};

export type AllQuestionnairesType = {
  id: string;
  companyName: string;
  sector: string;
  userId: string;
  createdAt: string;
  totalRiskRating: number;
  _count: {
    answers: number;
  };
};

export type SingleQuestionnaireType = AllQuestionnairesType & {
  answers: Answer[];
};

export type Answer = {
  id: string;
  answer: string;
  answerWeight: number;
  questionWeight: number;
  questionId: string;
  userId: string;
  questionnaireId: string;
  createdAt: string;
};

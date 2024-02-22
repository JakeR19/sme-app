export const chatSystemInput = (
  questions: string,
  arrLength: number,
  threats: string,
) =>
  `For the following security questions: ${questions}, Assign a threat from these 5 common threat (making sure to use all 5 threats at least once:) (${threats}) that best matches each question and the likelihood of it occuring for a company based in the sector that the user provides in their prompt. 
 The likelihood should be a number from 0-1 (low to high, one inclusive). Output in plain JSON format ONLY (no json backtick tag at the beginning or end)
 as an array of objects with the following structure: { id: string, threat: string, likelihood: number }, where id corresponds to the id of the question and likelihood is its
 corresponding likelihood and threat is its corresponding threat. Make sure the question in the JSON is written exactly as provided. 
 Your response should feature each threat atleast ONCE. Make sure each threat is assigned to ATLEAST one question.
 Make sure the length of the array matches the amount of questions provided, no more, no less. There are ${arrLength} questions so the output 
 array should be of ${arrLength} length.`;

export const riskTipsSystemInput = (threats: string) =>
  `For the following threats: ${threats}, give a tip for each 
  attack for how a company based in the sector that the user provides in their prompt can best protect themselves from. Make sure each tip is concise, 
  consisting of max two sentences. Output in plain JSON format ONLY (no json backtick tag at the beginning or end) as an array of objects with the following structure: 
  {threat: string, text: string} where threat is the respective threat and text is the respective tip. The response should contain a maximum of 5 tips`;

export const tempLikelihoods = [
  {
    id: "0ad0aed3-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.8,
  },
  {
    id: "0ad0b256-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.6,
  },
  {
    id: "0ad0b2e1-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Insider Threats",
    likelihood: 0.4,
  },
  {
    id: "0ad0b3b2-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
  {
    id: "0ad0b448-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.6,
  },
  {
    id: "0ad0b4ad-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
  {
    id: "0ad0b50a-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.8,
  },
  {
    id: "0ad0b56b-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.9,
  },
  {
    id: "0ad0b5ca-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Phishing Attacks",
    likelihood: 0.5,
  },
  {
    id: "0ad0b68b-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Insider Threats",
    likelihood: 0.7,
  },
  {
    id: "0ad0b72d-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Insider Threats",
    likelihood: 0.6,
  },
  {
    id: "0ad0b7a0-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.8,
  },
  {
    id: "0ad0b7fa-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.6,
  },
  {
    id: "0ad0b855-bad6-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.8,
  },
  {
    id: "c6c2c97e-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.7,
  },
  {
    id: "c6c2de78-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.6,
  },
  {
    id: "c6c2e03b-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.8,
  },
  {
    id: "c6c2e0bd-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.6,
  },
  {
    id: "c6c2e126-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
  {
    id: "c6c2e1b8-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.8,
  },
  {
    id: "c6c2e288-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.6,
  },
  {
    id: "c6c2e316-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Insider Threats",
    likelihood: 0.7,
  },
  {
    id: "d3cafafe-c6b6-11ee-9582-0641dc67bd0d",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
  {
    id: "e74a80bf-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Insider Threats",
    likelihood: 0.5,
  },
  {
    id: "e74a83f5-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.6,
  },
  {
    id: "e74a8472-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Ransomware Attacks",
    likelihood: 0.8,
  },
  {
    id: "e74a8530-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Ransomware Attacks",
    likelihood: 0.9,
  },
  {
    id: "e74a8599-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.6,
  },
  {
    id: "e74a85ef-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
  {
    id: "e74a867b-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Compliance Violations",
    likelihood: 0.6,
  },
  {
    id: "e74a86d3-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
  {
    id: "e74a872e-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Insider Threats",
    likelihood: 0.5,
  },
  {
    id: "e74a87a1-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.8,
  },
  {
    id: "e74a8826-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.6,
  },
  {
    id: "e74a8880-bad5-11ee-aa39-8a7433bc1b37",
    threat: "Data Breaches",
    likelihood: 0.7,
  },
];

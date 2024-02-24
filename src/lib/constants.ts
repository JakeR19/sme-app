// input prompt get likelihoods from chatgpt
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

// input prompt get tips from chatgpt
export const riskTipsSystemInput = (threats: string) =>
  `For the following threats: ${threats}, give a tip for each 
  attack for how a company based in the sector that the user provides in their prompt can best protect themselves from. Make sure each tip is concise, 
  consisting of max two sentences. Output in plain JSON format ONLY (no json backtick tag at the beginning or end) as an array of objects with the following structure: 
  {threat: string, text: string} where threat is the respective threat and text is the respective tip. The response should contain a maximum of 5 tips`;

export const aiChatSystemPrompt = (
  chosenQuestion: string,
) => `You are an AI tasked with helping the CISO at a company with their security 
concerns. The following security question the user would like help with is ${chosenQuestion}. 
You will do your best to help them with this security question along with any further enquiry 
they mey have regarding this security question. Make your response concise, maximum of two paragraphs.`;

export const chatSystemInput = (questions: string, arrLength: number) =>
  `For the following security questions: ${questions}, Assign a threat that matches each question and the likelihood
 of it occuring for a company based in the sector that the user provides in their prompt. The likelihood should be
 a number from 1 to 5, use this to work out the decimal (4/5 would be 0.8). Output in plain JSON format ONLY (no json backtick tag at the beginning or end)
 as an array of objects with the following structure: { title: string, likelihood: number }, where title is the question and likelihood is its
 corresponding likelihood. Make sure to the question in the JSON is written exactly as provided. Make sure the length of the array matches the amount of questions provided, no more, no less.
 There are ${arrLength} questions so the output array should be of ${arrLength} length.`;

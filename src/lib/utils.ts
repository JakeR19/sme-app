import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function riskCalculationAlgo({
  questionWeight,
  answerWeight,
  likelihood,
}: {
  questionWeight: number;
  answerWeight: number;
  likelihood: number;
}) {
  return questionWeight * answerWeight * likelihood;
}

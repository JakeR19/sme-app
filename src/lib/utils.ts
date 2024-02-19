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
}): number {
  return questionWeight * answerWeight * likelihood;
}

export function getRiskRatingRange(num: number) {
  const ranges = [
    [230, 436], // 1
    [437, 643], // 2
    [644, 850], // 3
    [851, 1057], // 4
    [1058, 1264], // 5
    [1265, 1471], // 6
    [1472, 1678], // 7
    [1679, 1885], // 8
    [1886, 2092], // 9
    [2093, 2300], // 10
  ];

  for (let i = 0; i < ranges.length; i++) {
    const [min, max] = ranges[i] as [number, number];
    if (num >= min && num <= max) {
      return i + 1;
    }
  }
  // Number if out of range
  return 0;
}

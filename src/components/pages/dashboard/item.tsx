import { Tooltip } from "@chakra-ui/react";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { type AllQuestionnairesType } from "~/lib/types/questionnaire";
import { getPercentageDifference, getRiskRatingRange } from "~/lib/utils";

export default function DashboardItem({
  prevRating,
  question,
  index,
}: {
  question: AllQuestionnairesType;
  index: number;
  prevRating?: number;
}) {
  const difference =
    prevRating &&
    getPercentageDifference(
      getRiskRatingRange(question.totalRiskRating),
      getRiskRatingRange(prevRating),
    );

  return (
    <Link
      href={`/report/${question.id}`}
      className="flex cursor-pointer items-center justify-between rounded-lg border p-2 shadow-sm hover:bg-slate-100"
      key={question.id}
    >
      <div className="ml-2 flex items-center space-x-4">
        <div className="border-r pr-3 font-semibold text-slate-400">
          #{index}
        </div>
        <div>
          <div className="flex">
            <h1 className="font-bold">{question.companyName}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-gray-500">
              Submitted {new Date(question.createdAt).toLocaleDateString()}
            </p>
            <p className="-mt-1  text-gray-500">·</p>
            <p className="text-xs text-gray-500">
              Risk: {getRiskRatingRange(question.totalRiskRating)}/10
            </p>
          </div>
        </div>
        <Tooltip
          openDelay={300}
          bg="white"
          border="1px"
          fontSize="xs"
          borderColor="gray.300"
          borderRadius={"md"}
          color="gray.800"
          label="Difference from previous questionnaire"
        >
          <div className="ml-5 rounded-md font-semibold shadow-sm">
            <DifferencePill difference={difference} />
          </div>
        </Tooltip>
      </div>
      <div>
        <ChevronRight />
      </div>
    </Link>
  );
}

function DifferencePill({ difference }: { difference?: number }) {
  if (typeof difference === "undefined")
    return (
      <div className="flex h-5 items-center justify-center rounded-md border border-gray-300 bg-gray-200 p-1 text-xs text-slate-700">
        - %
      </div>
    );
  if (difference === 0) {
    return (
      <div className="flex h-5 items-center justify-center rounded-md border border-gray-300 bg-gray-200 p-1 text-xs text-slate-700">
        - %
      </div>
    );
  }
  if (difference > 0) {
    return (
      <div className="flex h-5 items-center justify-center rounded-md border border-red-300 bg-red-200 p-1 text-xs text-red-700">
        {difference.toFixed()}%
        <ChevronUp className="text-red-700" size={16} />
      </div>
    );
  }
  if (difference < 0) {
    return (
      <div className="flex h-5 items-center justify-center rounded-md border border-green-300 bg-green-200 p-1 text-xs text-green-700">
        {difference.toFixed()}%
        <ChevronDown className="text-green-700" size={16} />
      </div>
    );
  }
}

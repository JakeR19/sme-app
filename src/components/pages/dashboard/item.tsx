import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { type AllQuestionnairesType } from "~/lib/types/questionnaire";

export default function DashboardItem({
  question,
  index,
}: {
  question: AllQuestionnairesType;
  index: number;
}) {
  return (
    <Link
      href={`/report/${question.id}`}
      className="flex cursor-pointer items-center justify-between rounded-lg border p-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:bg-slate-100"
      key={question.id}
    >
      <div className="ml-2 flex items-center space-x-3">
        <div className="border-r pr-3 font-semibold text-slate-400">
          #{index}
        </div>
        <div>
          <div className="flex">
            <h1 className="font-bold">{question.companyName}</h1>
          </div>
          <p className="text-sm text-gray-500">
            Submitted {new Date(question.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>
        <ChevronRight />
      </div>
    </Link>
  );
}

import { FileText, Sliders, PcCase } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  "Data Assets": <FileText />,
  Controls: <Sliders />,
  "System Assets": <PcCase />,
};

export default function QuestionnaireHeader({
  label,
  title,
}: {
  label?: string;
  title: string;
}) {
  return (
    <div className="mb-10 w-full">
      <div className="flex items-center">
        <h1 className="-mb-1 text-[30px] font-semibold">{title}</h1>
        <div className="-mb-[6px] ml-2">{icons[title]}</div>
      </div>
      {label && <p className="text-sm text-slate-500">{label}</p>}
      <div className="mt-2 border-b border-slate-200" />
    </div>
  );
}

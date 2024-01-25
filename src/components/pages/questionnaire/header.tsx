export default function QuestionnaireHeader({
  label,
  title,
}: {
  label?: string;
  title: string;
}) {
  return (
    <div className="mb-10 w-full">
      <h1 className="-mb-1 text-[30px] font-semibold">{title}</h1>
      {label && <p className="text-sm text-slate-500">{label}</p>}
      <div className="mt-2 border-b border-slate-200" />
    </div>
  );
}

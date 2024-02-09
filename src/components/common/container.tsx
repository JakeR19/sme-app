export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-[1px] border-gray-200 bg-white p-5 shadow-md">
      <div className="w-[100%]">{children}</div>
    </div>
  );
}

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-[90vh] min-h-[90vh] rounded-lg border-[1px] border-gray-200 bg-white p-5">
      <div className="w-[100%] pb-5">{children}</div>
    </div>
  );
}

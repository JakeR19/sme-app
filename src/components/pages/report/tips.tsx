export default function Tips() {
  return (
    <div className="h-full rounded-lg border px-3 py-2 shadow-sm">
      <h1 className="font-semibold text-gray-700">Tips</h1>
      <ul className="mt-2 space-y-2">
        {Array(5)
          .fill(
            "Try to secure your credentials by using two factor authentication.",
          )
          .map((tip, index) => (
            <li
              key={index}
              className="flex space-x-1 rounded-md border px-2 py-1 text-center text-sm text-gray-700"
            >
              <p className="text-gray-400">#{index + 1} </p>
              <p>{tip}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

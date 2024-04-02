import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { type Answer } from "~/lib/types/questionnaire";

export default function ThreatChart({ answers }: { answers: Answer[] }) {
  // get number of occurrences for each threat in the questionnaire answers
  const threatOccurrences = answers.reduce(
    (counts: Record<string, number>, { threat }) => {
      counts[threat!] = (counts[threat!] ?? 0) + 1;
      return counts;
    },
    {},
  );

  // map the occurences to an array that the barchart can use
  const result = Object.entries(threatOccurrences)
    .map(([threat, counts]) => ({
      threat,
      counts,
    }))
    .filter((bar) => bar.threat);

  console.log(result);

  return (
    <div className="max-h-[35vh] rounded-lg border px-3 py-2 shadow-sm">
      <h1 className="font-semibold text-gray-700">Threat Occurrences</h1>
      <ResponsiveContainer className="mt-2" width="102%" height="90%">
        <BarChart
          data={result}
          margin={{
            top: 5,
            right: 14,
            left: 20,
            bottom: 15,
          }}
        >
          <Tooltip />
          <XAxis
            height={25}
            angle={10}
            fontSize={"10px"}
            interval={0}
            dataKey="threat"
          />
          <YAxis fontSize={"12px"} width={2} />
          <Bar dataKey="counts" fill="#5dade2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

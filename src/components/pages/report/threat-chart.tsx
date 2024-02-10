import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Software",
    score: 10,
  },
  {
    name: "Hardware",
    score: 8,
  },
  {
    name: "Data",
    score: 10,
  },
  {
    name: "Personnel",
    score: 5,
  },
  {
    name: "Storage",
    score: 4,
  },
];

export default function ThreatChart() {
  return (
    <div className="max-h-[35vh] rounded-lg border px-3 py-2 shadow-sm">
      <h1 className="font-semibold text-gray-700">Threat Chart</h1>
      <ResponsiveContainer className="mt-2" width="102%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 14,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={"10px"} interval={0} dataKey="name" />
          <YAxis fontSize={"12px"} width={2} />
          <Bar dataKey="score" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

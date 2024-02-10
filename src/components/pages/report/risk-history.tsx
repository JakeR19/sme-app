import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "01/01/2023",
    score: 10,
  },
  {
    date: "01/02/2023",
    score: 8,
  },
  {
    date: "01/03/2023",
    score: 10,
  },
  {
    date: "01/04/2023",
    score: 5,
  },
  {
    date: "01/05/2023",
    score: 4,
  },
];

export default function RiskHistory() {
  return (
    <div className="col-span-1 max-h-[45vh] rounded-lg border px-3 py-2 shadow-sm md:col-span-2">
      <h1 className="font-semibold text-gray-700">Risk History</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={"10px"} interval={0} dataKey="date" />
          <YAxis fontSize={"12px"} width={2} />
          <Tooltip />
          {/* <Legend fontSize={"10px"} /> */}
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

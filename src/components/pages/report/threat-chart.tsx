import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Software",
    uv: 10,
  },
  {
    name: "Hardware",
    uv: 8,
  },
  {
    name: "Data",
    uv: 10,
  },
  {
    name: "Personnel",
    uv: 5,
  },
  {
    name: "Storage",
    uv: 4,
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
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={"10px"} interval={0} dataKey="name" />
          <YAxis fontSize={"12px"} width={2} />
          <Tooltip />
          {/* <Legend />   */}
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

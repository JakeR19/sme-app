import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRiskRatingRange } from "~/lib/utils";

type RiskHistoryType = {
  id: string;
  totalRiskRating: number;
  createdAt: Date;
};

export default function RiskHistory({ id }: { id: string }) {
  const [historyData, setHistoryData] = useState<RiskHistoryType[]>([]);
  useEffect(() => {
    void fetch(`/api/questionnaire/${id}/history`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: RiskHistoryType[]) => {
        setHistoryData(data);
      });
  }, [id]);

  return (
    <div className="col-span-1 max-h-[48vh] rounded-lg border px-3 py-2 shadow-sm md:col-span-2">
      <div className="flex items-center">
        <h1 className="font-semibold text-gray-700">Risk History</h1>
        <p className="ml-1 mt-[3px] text-xs text-slate-600">
          You have {historyData.length} total scores.
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={historyData.map((data) => {
            return {
              ...data,
              score: getRiskRatingRange(data.totalRiskRating),
              date: new Date(data.createdAt).toLocaleDateString(),
            };
          })}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={"10px"} interval={0} dataKey="date" />
          <YAxis
            tickCount={1}
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            allowDecimals={false}
            fontSize={"12px"}
            width={2}
          />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

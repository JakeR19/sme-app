import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getRiskRatingRange } from "~/lib/utils";

export default function RiskScore({ riskRating }: { riskRating: number }) {
  const range = getRiskRatingRange(riskRating);
  const percentage = range * 10;

  return (
    <div className="rounded-lg border px-3 py-2 shadow-sm lg:max-h-[35vh]">
      <h1 className="font-semibold text-gray-700">Risk Score</h1>
      <div className="mx-auto mt-2 flex h-[80%] w-[80%] items-center justify-center p-6">
        <div className="h-max w-max rounded-full border bg-gray-100/50 p-4 shadow-md">
          <CircularProgressbar
            value={percentage}
            text={`${range}/10`}
            strokeWidth={5}
            styles={{
              trail: {
                stroke: "#a19f9f",
                strokeLinecap: "butt",
                border: "1px solid #000000",
              },
              path: {
                stroke: "#F4D03F",
              },
              text: {
                fontSize: "14px",
                fontFamily: "inherit",
                fontWeight: "bold",
                fill: "#4d4d4d",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

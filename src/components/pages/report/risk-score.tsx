import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function RiskScore() {
  const score = 7.5;
  const percentage = score * 10;

  return (
    <div className="rounded-lg border px-3 py-2 shadow-sm lg:max-h-[35vh]">
      <h1 className="font-semibold text-gray-700">Risk Score</h1>
      <div className="mx-auto mt-2 flex h-[80%] w-[80%] items-center justify-center p-6">
        <CircularProgressbar
          value={percentage}
          text={`${score}/10`}
          strokeWidth={5}
          styles={
            (buildStyles({
              pathColor: `#fffff0`,
              trailColor: "#fffff0",
              backgroundColor: "#3e98c7",
            }),
            {
              background: {
                color: "#03031a",
              },
              text: {
                fontFamily: "inherit",
                fontSize: "10px",
                fontWeight: "bold",
              },
            })
          }
        />
      </div>
    </div>
  );
}
import { Inter } from "next/font/google";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RiskScore() {
  const score = 7.5;
  const percentage = score * 10;

  return (
    <div className="h-max rounded-lg border px-3 py-2 shadow-sm">
      <h1 className="font-semibold text-gray-700">Risk Score</h1>
      <div className="p-10">
        <CircularProgressbar
          className={`font-sans ${inter.variable}`}
          value={percentage}
          text={`${score}/10`}
          styles={{
            background: {
              color: "#03031a",
            },
            text: {
              fontFamily: "inherit",
              fontSize: "10px",
              fontWeight: "bold",
            },
          }}
        />
      </div>
    </div>
  );
}

import GaugeComponent from "react-gauge-component";
import { getRiskRatingRange } from "~/lib/utils";

export default function ThreatLevel({ riskRating }: { riskRating: number }) {
  const range = getRiskRatingRange(riskRating);

  return (
    <div className="flex h-full flex-col rounded-lg border shadow-sm">
      <h1 className="ml-3 mt-2 font-semibold text-gray-700">Threat Level</h1>
      <div className="my-auto flex items-center justify-center">
        <GaugeComponent
          className="my-auto h-full w-full"
          maxValue={10}
          value={range}
          arc={{
            gradient: false,
            width: 0.2,
            padding: 0.03,
            subArcs: [
              {
                limit: 3,
                color: "#5BE12C",
              },
              {
                limit: 6,
                color: "#F5CD19",
              },
              {
                limit: 10,
                color: "#EA4228",
              },
            ],
          }}
          pointer={{ type: "needle", width: 8 }}
          type="semicircle"
          labels={{
            tickLabels: {
              type: "inner",
              defaultTickValueConfig: {
                style: { color: "black" },
                formatTextValue: (value) => {
                  if (value === 0) {
                    return "Low";
                  } else if (value === 100) {
                    return "High";
                  } else {
                    return "";
                  }
                },
              },
              ticks: [{ value: 33 }, { value: 66 }, { value: 100 }],
            },
            valueLabel: {
              hide: true,
            },
          }}
        />
      </div>
    </div>
  );
}

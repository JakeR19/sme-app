import GaugeComponent from "react-gauge-component";

export default function ThreatLevel() {
  return (
    <div className="flex h-full flex-col rounded-lg border shadow-sm">
      <h1 className="ml-3 mt-2 font-semibold text-gray-700">Threat Level</h1>
      <div className="my-auto flex items-center justify-center">
        <GaugeComponent
          className="my-auto h-full w-full"
          maxValue={100}
          value={60}
          arc={{
            gradient: false,
            width: 0.2,
            padding: 0.03,
            subArcs: [
              {
                limit: 33,
                color: "#5BE12C",
              },
              {
                limit: 66,
                color: "#F5CD19",
              },
              {
                limit: 100,
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

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "~/components/common/container";
import { LoadingPage } from "~/components/common/loading-spinner";
import RiskHistory from "~/components/pages/report/risk-history";
import RiskScore from "~/components/pages/report/risk-score";
import ThreatChart from "~/components/pages/report/threat-chart";
import ThreatLevel from "~/components/pages/report/threat-level";
import Tips from "~/components/pages/report/tips";
import { type SingleQuestionnaireType } from "~/lib/types/questionnaire";

export default function SingleReportPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<SingleQuestionnaireType | undefined>(
    undefined,
  );
  useEffect(() => {
    setLoading(true);
    void fetch(`/api/questionnaire/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: SingleQuestionnaireType) => {
        setData(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="flex h-[84vh] flex-col items-center justify-center">
          <LoadingPage />
        </div>
      </Container>
    );
  }

  return (
    <div className="-mt-4">
      {data && (
        <Container>
          {/* render all charts in grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <RiskScore riskRating={data.totalRiskRating} />
            <ThreatChart answers={data.answers} />
            <ThreatLevel riskRating={data.totalRiskRating} />
            <RiskHistory id={id} />
            <Tips id={id} />
          </div>
        </Container>
      )}
    </div>
  );
}

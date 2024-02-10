"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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
        console.log(data);
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
    <>
      <Link href="/" className="-my-[26px] flex items-center text-gray-500">
        <ChevronLeft size={18} />
        <p className="text-sm">Back</p>
      </Link>
      {data && (
        <Container>
          <div className="-mt-5 text-center">
            <h1 className="my-2 text-xl font-semibold text-gray-700">
              {data.companyName}
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <RiskScore />
            <ThreatChart />
            <ThreatLevel />
            <RiskHistory />
            <Tips />
          </div>
        </Container>
      )}
    </>
  );
}

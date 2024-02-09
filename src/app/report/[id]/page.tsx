"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
// import { useParams } from "next/navigation";
import Container from "~/components/common/container";
import RiskHistory from "~/components/pages/report/risk-history";
import RiskScore from "~/components/pages/report/risk-score";
import ThreatChart from "~/components/pages/report/threat-chart";
import ThreatLevel from "~/components/pages/report/threat-level";
import Tips from "~/components/pages/report/tips";

export default function SingleReportPage() {
  // const params = useParams<{ id: string }>();

  return (
    <>
      <Link href="/" className="-my-[26px] flex items-center text-gray-500">
        <ChevronLeft size={18} />
        <p className="text-sm">Back</p>
      </Link>
      <Container>
        <div className="grid h-[84vh] grid-cols-3 gap-3">
          <RiskScore />
          <ThreatChart />
          <ThreatLevel />
          <RiskHistory />
          <Tips />
        </div>
      </Container>
    </>
  );
}

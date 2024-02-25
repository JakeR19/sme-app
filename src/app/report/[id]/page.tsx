"use client";

import { Button } from "@chakra-ui/react";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "~/components/common/container";
import { LoadingPage } from "~/components/common/loading-spinner";
import RiskHistory from "~/components/pages/report/risk-history";
import RiskScore from "~/components/pages/report/risk-score";
import ThreatChart from "~/components/pages/report/threat-chart";
import ThreatLevel from "~/components/pages/report/threat-level";
import Tips from "~/components/pages/report/tips";
import { type SingleQuestionnaireType } from "~/lib/types/questionnaire";
import html2canvas from "html2canvas";

export default function SingleReportPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<SingleQuestionnaireType | undefined>(
    undefined,
  );
  const reportContainerRef = useRef<HTMLDivElement | null>(null);

  const handlePDFExport = async () => {
    // function to convert div to canvas and download as jpeg
    const container = document.getElementById("reportContainer");
    if (container) {
      const canvas = await html2canvas(container, {
        scale: 2,
      });
      const dataURL = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      link.href = dataURL;
      link.download = `${data?.companyName} ${new Date(data!.createdAt).toISOString().split("T")[0]} - Report.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    setLoading(true);
    // fetch report data by id
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
    <div id="reportContainer" className="-mt-4">
      {data && (
        <Container>
          {/* header */}
          <div className="-mt-3 flex items-center justify-between pb-2 text-center">
            <Link data-html2canvas-ignore="true" href="/">
              <Button className="border shadow-sm" size="xs" fontSize={"small"}>
                <ArrowLeft className="mr-1" size={12} />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-1">
              <p className="font-semibold">{data.companyName}</p>
              <p className="mt-[2px] text-xs text-slate-600">
                {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              data-html2canvas-ignore="true"
              onClick={handlePDFExport}
              className="border shadow-sm"
              size="xs"
              fontSize={"small"}
            >
              <Download className="mr-1" size={12} />
              Export as image
            </Button>
          </div>
          <div
            ref={reportContainerRef}
            className="grid grid-cols-1 gap-3 md:grid-cols-3"
          >
            {/* render all charts in grid */}
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

"use client";

import { useParams } from "next/navigation";

export default function SingleReportPage() {
  const params = useParams<{ id: string }>();

  return <h1>{params.id}</h1>;
}

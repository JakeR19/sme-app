"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "~/components/common/loading-spinner";

export default function Tips({ id }: { id: string }) {
  const [tips, setTips] = useState<{ threat: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    void fetch(`/api/questionnaire/${id}/tips`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: { threat: string; text: string }[]) => {
        setTips(data);
        setIsLoading(false);
      });
  }, [id]);
  return (
    <div className="rounded-lg border px-3 py-2 shadow-sm">
      <h1 className="font-semibold text-gray-700">AI Tips</h1>
      <div className="h-full">
        {isLoading && (
          <div className="flex h-[90%] w-full items-center justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
        {!isLoading && tips.length > 0 && (
          <div className="space-y-1">
            {tips.map((tip, index) => (
              <div className="rounded-md border p-[6px]" key={index}>
                <h1 className="text-xs font-semibold">{tip.threat}</h1>
                <p className="text-xs">{tip.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

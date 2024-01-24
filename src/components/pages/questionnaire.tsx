import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Questionnaire() {
  const questionnaireSteps: Record<string, React.ReactNode> = {
    information: <p>inform1ation</p>,
    dataAssets: <p>data assets</p>,
    systemAssets: <p>system assets</p>,
    controls: <p>controls</p>,
  };

  const [index, setIndex] = useState<number>(0);
  const selectedStep: React.ReactNode = questionnaireSteps[index.toString()];

  return (
    <div className="w-full space-y-4">
      <div className="max-w-[300px] space-y-1">
        <Label htmlFor="companyName">Company name</Label>
        <Input id="companyName" placeholder="Enter your company name" />
      </div>
      <div className="max-w-[300px] space-y-1">
        <Label htmlFor="sector">Sector</Label>
        <Select>
          <SelectTrigger className="text-left" id="sector">
            <SelectValue placeholder="Choose your company sector..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="financialServices">
              Financial Services
            </SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturingAndSupplyChain">
              Manufacturing and Supply Chain
            </SelectItem>
            <SelectItem value="technologyAndSoftwareServices">
              Technology and Software Services
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={() => index < 3 && setIndex((index) => index + 1)}
        className="float-right"
      >
        Next
      </Button>
    </div>
  );
}

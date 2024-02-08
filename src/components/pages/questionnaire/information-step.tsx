import { Input } from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function InformationStep({
  onChange,
  companyNameValue,
  companySectorValue,
}: {
  companyNameValue: string;
  companySectorValue: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="ml-5">
      <div className="w-full space-y-4">
        <div className="max-w-[300px] space-y-1">
          <p className="text-sm font-semibold">Company name</p>
          <Input
            value={companyNameValue}
            focusBorderColor={"black"}
            onChange={(e) => onChange("companyName", e.target.value)}
            name="companyName"
            id="companyName"
            placeholder="Enter your company name"
          />
        </div>
        <div className="max-w-[300px] space-y-1">
          <p className="text-sm font-semibold">Sector</p>
          <Select
            value={companySectorValue}
            name="sector"
            onValueChange={(value) => onChange("sector", value)}
          >
            <SelectTrigger className="text-left" id="sector">
              <SelectValue placeholder="Choose your company sector..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Financial Services">
                Financial Services
              </SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Manufacturing and Supply Chain">
                Manufacturing and Supply Chain
              </SelectItem>
              <SelectItem value="Technology and Software Services">
                Technology and Software Services
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

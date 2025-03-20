import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job } from "@prisma/client";
import { useState } from "react";

type CompanyQuestionData = {
  name: string;
  job: Job;
  numberOfEmployees: number;
};

export function CompanyQuestion({
  onCompleted,
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCompleted: (data: any) => void;
  data?: CompanyQuestionData;
}) {
  const handleSubmit = async () => {
    const data = {
      name: companyName,
      job: sector,
      numberOfEmployees: Number(employees),
    };
    onCompleted(data);
  };
  const [companyName, setCompanyName] = useState(data?.name || "");
  const [sector, setSector] = useState(data?.job || "");
  const [employees, setEmployees] = useState(data?.numberOfEmployees || "");
  const sectors = Object.values(Job);
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1" htmlFor="companyName">
          Company Name
        </Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter your company name"
        />
      </div>

      <div>
        <Label className="mb-1" htmlFor="sector">
          Sector of Activity
        </Label>
        <Select onValueChange={setSector}>
          <SelectTrigger>
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1" htmlFor="employees">
          Number of Employees
        </Label>
        <Input
          id="employees"
          type="number"
          value={employees}
          onChange={(e) => setEmployees(e.target.value)}
          placeholder="Enter number of employees"
        />
      </div>
      {data === undefined && (
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      )}
    </div>
  );
}

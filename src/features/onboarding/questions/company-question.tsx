"use client";
import { useState } from "react";
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
import { motion } from "framer-motion";
import { companyInformationAction } from "./questions-actions";
import { Job } from "@prisma/client";

interface CompagnyQuestionProps {
  onCompleted: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CompagnyQuestion({
  onCompleted,
}: CompagnyQuestionProps) {
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [employees, setEmployees] = useState("");
  const sectors = Object.values(Job);

  const handleSubmit = async () => {
    const data = {
      name: companyName,
      job: sector,
      numberOfEmployees: Number(employees),
    };
    await companyInformationAction(data);
    onCompleted();
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto px-4 py-6 space-y-6"
    >
      <motion.div variants={item} className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Company Information
        </h1>
        <p className="text-muted-foreground">
          Please fill in the details about your company.
        </p>
      </motion.div>

      <motion.div variants={item} className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <Label htmlFor="sector">Sector of Activity</Label>
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
          <Label htmlFor="employees">Number of Employees</Label>
          <Input
            id="employees"
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            placeholder="Enter number of employees"
          />
        </div>
      </motion.div>

      <motion.div variants={item} className="text-center mt-4">
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { callAction } from "../app/call/call-actions";

export default function CallDialog() {
  const router = useRouter();
  const handleSubmit = () => {
    callAction();
    router.push("/call-later");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Before you leave...</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <p className="text-muted-foreground">
            Would it be better if we call you at another time? Let us know when
            works best for you.
          </p>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Your phone number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full rounded-md border p-2"
              placeholder="Click to fill number"
              onClick={(e) => {
                (e.target as HTMLInputElement).value = "+41786305531";
              }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium">
              Preferred time
            </label>
            <input
              id="time"
              type="time"
              className="w-full rounded-md border p-2"
              onClick={(e) => {
                (e.target as HTMLInputElement).value = "16:00";
              }}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Schedule Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

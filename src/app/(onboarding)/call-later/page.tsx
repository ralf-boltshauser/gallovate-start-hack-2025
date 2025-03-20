import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="max-w-sm w-full space-y-8 text-center">
        <div className="space-y-6">
          <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto flex items-center justify-center">
            <PhoneCall className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              We&apos;ll call you at 16:00
            </h1>
            <p className="text-muted-foreground">Have a wonderful day! 😊</p>
          </div>
        </div>

        <Link href="/">
          <Button className="w-full" variant="ghost">
            Continue to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

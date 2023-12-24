"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Image
          src="/images/error.svg"
          width={400}
          height={400}
          alt="error img"
        />
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}

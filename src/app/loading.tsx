"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Image
          src="/images/loading.svg"
          width={400}
          height={400}
          alt="loading img"
        />

        <h1 className="text-2xl font-bold">Loading please wait...</h1>
      </div>
    </div>
  );
}

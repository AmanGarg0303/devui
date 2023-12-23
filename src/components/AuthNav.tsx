import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthNav() {
  return (
    <div className="flex gap-1 absolute top-2 left-2 lg:top-5 lg:left-10 items-center">
      <Image src="/images/logo.png" width="50" height="50" alt="logo" />
      <Link href="/">
        <h1 className="text-2xl font-bold">DevUi</h1>
      </Link>
    </div>
  );
}

"use client";
import AuthNav from "@/components/AuthNav";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const submit = () => {
    console.log(authState);
  };

  return (
    <div className="h-screen">
      <AuthNav />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Image
            src="/images/design.svg"
            width="100"
            height="100"
            alt="auth-side-img"
            className="h-screen w-full"
          />
        </div>

        <div className="flex justify-center items-center mt-20 lg:mt-0">
          <div className="px-10 lg:px-32 w-full">
            <h1 className="text-5xl font-bold">DevUi</h1>
            <p>Welcome Back! explore the world's best designs</p>

            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                id="email"
                autoComplete="off"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                id="password"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <Button onClick={submit} className="w-full">
                Login
              </Button>
            </div>

            <div className="mt-2 text-center font-bold">
              <strong>Don't have an account?</strong>
              <Link href="/register" className="text-orange-500 ml-2">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

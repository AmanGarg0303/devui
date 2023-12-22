"use client";
import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import AuthNav from "@/components/AuthNav";

export default function Register() {
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
            <p>Explore the world's best designs for your next project</p>

            <div className="mt-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                id="name"
                autoComplete="off"
                onChange={(e) =>
                  setAuthState({ ...authState, name: e.target.value })
                }
              />
            </div>

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
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Enter your password again"
                id="cpassword"
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-4">
              <Button onClick={submit} className="w-full">
                Register
              </Button>
            </div>

            <div className="mt-2 text-center font-bold">
              <strong>Already have an account?</strong>
              <Link href="/login" className="text-orange-500 ml-2">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

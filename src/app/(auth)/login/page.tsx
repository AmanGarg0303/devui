"use client";
import AuthNav from "@/components/AuthNav";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { loadingSvg } from "@/svgs/svgs";
import { signIn } from "next-auth/react";
import { Rocket } from "lucide-react";

export default function Login() {
  const params = useSearchParams();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthErrorType>({});

  const submit = () => {
    setLoading(true);
    axios
      .post(`/api/auth/login`, authState)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
            {params?.get("message") && (
              <Alert className="bg-green-300 mb-4">
                <Rocket className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{params?.get("message")}</AlertDescription>
              </Alert>
            )}

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
              <span className="text-red-500 text-sm">{errors?.email}</span>
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
              <span className="text-red-500 text-sm">{errors?.password}</span>
            </div>

            <div className="mt-4">
              <Button onClick={submit} className="w-full" disabled={loading}>
                {loading ? <>{loadingSvg}</> : "Login"}
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

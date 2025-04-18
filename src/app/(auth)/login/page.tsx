"use client";

import { CheckCheck, Github, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgGoogle } from "react-icons/cg";
import { signinApi } from "@/services/auth";
import type { SigninFormData } from "@/types/Auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) router.push("/tasks");
  }, [router, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signinApi({ formData, setUser, router });
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen px-4">
      {/* Logo / Heading */}
      <Link href="/" className="flex items-center justify-center gap-3">
        <CheckCheck
          size={35}
          className="bg-primary text-primary-foreground rounded p-1"
        />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Rapid</span> Task
        </h1>
      </Link>

      {/* Login Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground">
            Login with your GitHub or Google account
          </p>
        </CardHeader>

        <CardContent>
          {/* Social Logins */}
          <div className="flex flex-col gap-4 mb-6">
            <Button variant="outline" className="bg-muted hover:bg-accent">
              <Github size={16} className="mr-2" /> Login with GitHub
            </Button>
            <Button variant="outline" className="bg-muted hover:bg-accent">
              <CgGoogle size={18} className="mr-2" /> Login with Google
            </Button>
          </div>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t" />
            <span className="mx-4 text-sm text-muted-foreground">
              Or continue with
            </span>
            <div className="flex-grow border-t" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 bottom-2.5 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline text-primary underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <p className="text-xs text-center text-muted-foreground max-w-[60%]">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

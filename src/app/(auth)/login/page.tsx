'use client'
import { CheckCheck, CircleAlert, Eye, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgGoogle } from "react-icons/cg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("User logged in successfully");
        router.push("/tasks");
      } else {
        toast.error("User login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-page flex flex-col gap-6 items-center justify-center h-screen text-white">
      <div className="flex items-center justify-center gap-3">
        <CheckCheck size={35} className="bg-primary text-white rounded p-1" />
        <h1 className="text-4xl md:text-[35px] font-bold text-white">
          <span className="text-bg-primary">Rapid</span> Task
        </h1>
      </div>

      <div className="flex flex-col gap-6 rounded-md">
        <div className="flex flex-col border rounded-md bg-stone-900 border-stone-800 shadow-sm">
          <div className="p-6 text-center font-bold space-y-1">
            <h3 className="title text-xl font-medium text-white">
              Welcome back
            </h3>
            <p className="text-muted-foreground font-light">
              Login with your Github or Google account
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="login-with flex flex-col gap-4 mb-5">
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium bg-black hover:bg-stone-800 border border-stone-800 hover:border-stone-800 hover:cursor-pointer rounded-md text-white focus:outline-none flex justify-center items-center"
              >
                <span className="me-2 bg-white text-black rounded-full w-4 h-4 relative">
                  <Github
                    size={14}
                    className="absolute translate-x-1/2 bottom-0 right-1/2"
                    fill="black"
                  />
                </span>{" "}
                Login with Github
              </button>
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium bg-background hover:bg-stone-800 border border-stone-800 hover:border-stone-800 hover:cursor-pointer rounded-md text-white focus:outline-none flex justify-center items-center"
              >
                <CgGoogle size={18} className="me-2" />
                Login with Google
              </button>
            </div>
            <div className="relative  after:absolute after:inset-0 after:z-0 after:top-1/2 after:flex after:items-center after:border-t after:border-stone-800 text-center text-sm">
              <span className="relative z-10 bg-black px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid relative">
                  <label className="mb-2 font-medium text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="z@emaple.com"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <CircleAlert
                    size={16}
                    className="absolute end-0 bottom-3 right-2"
                  />
                </div>
                <div className="grid relative">
                  <label
                    className="mb-2 font-medium text-sm"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <Eye size={16} className="absolute end-0 bottom-3 right-2" />
                </div>
                <button
                  type="submit"
                  className="focus:outline-none text-black bg-primary focus:ring-4 focus:ring-primary font-medium rounded-md text-sm px-5 py-2.5 me-2 dark:bg-primary dark:hover:bg-primary cursor-pointer dark:focus:ring-primary"
                >
                  Login
                </button>
                <div className="text-center text-sm">
                  {`Don't have an account? `}
                  <a
                    className="underline text-primary underline-offset-4"
                    href="signUp"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-[60%] mx-auto text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;

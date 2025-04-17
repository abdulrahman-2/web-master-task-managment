"use client";

import { CheckCheck, CircleAlert, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("User created successfully");
        router.push("/login");
      } else {
        toast.error("User creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page flex flex-col gap-6 items-center justify-center h-screen text-white">
      <div className="flex items-center justify-center gap-3">
        <CheckCheck size={35} className="bg-primary text-white rounded p-1" />
        <h1 className="text-3xl md:text-[35px] font-bold text-white">
          <span className="text-bg-primary">Rapid</span> Task
        </h1>
      </div>

      <div className="flex flex-col gap-6 rounded-md">
        <div className="flex flex-col border rounded-md bg-stone-900 border-stone-800 shadow-sm">
          <div className="p-6 text-center font-bold space-y-1">
            <h3 className="title text-xl font-semibold text-white">Sign up</h3>
            <p className="text-muted-foreground font-light text-sm">
              Welcome to Quick Task! Please enter your details.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid relative">
                  <label
                    className="mb-2 font-medium text-sm leading-none"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid relative">
                  <label
                    className="mb-2 font-medium text-sm leading-none"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="z@emaple.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <CircleAlert
                    size={16}
                    className="absolute end-0 bottom-3 right-2"
                  />
                </div>
                <div className="grid relative">
                  <label
                    className="mb-2 font-medium text-sm leading-none"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Eye size={16} className="absolute end-0 bottom-3 right-2" />
                </div>
                <div className="grid relative">
                  <label
                    className="mb-2 font-medium text-sm leading-none"
                    htmlFor="password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="focus:outline-none text-black bg-primary focus:ring-4 focus:ring-primary font-medium rounded-md text-sm px-5 py-2.5 me-2 dark:bg-primary dark:hover:bg-primary cursor-pointer dark:focus:ring-primary"
                >
                  Sign up
                </button>
                <div className="text-center text-sm">
                  {`Already have an account? `}
                  <a
                    className="underline text-primary underline-offset-4"
                    href="login"
                  >
                    Login
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

export default SignUp;

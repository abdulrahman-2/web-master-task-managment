import { CheckCheck, CircleAlert, Eye } from "lucide-react";
import React from "react";

const SignUp = () => {
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
            <h3 className="title text-xl font-semibold text-white">
              Sign up
            </h3>
            <p className="text-muted-foreground font-light text-sm">
              Welcome to Quick Task! Please enter your details.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form>
              <div className="grid gap-6">
                <div className="grid relative">
                  <label className="mb-2 font-medium text-sm leading-none" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="grid relative">
                  <label className="mb-2 font-medium text-sm leading-none" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="bg-black h-10 px-3 py-2 rounded-md border border-stone-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="z@emaple.com"
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
                    name="password"
                    id="password"
                  />
                </div>
                <button
                  type="button"
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
  )
};

export default SignUp;

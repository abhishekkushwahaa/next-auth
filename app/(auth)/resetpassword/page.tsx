"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const ResetPassword = ({ params }: { params: { email: string } }) => {
  const [password, setPassword] = useState("");
  const [leading, setLeading] = useState(false);
  const [error, setError] = useState<loginErrorType>();

  const searchParam = useSearchParams();
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLeading(true);
    axios
      .post("/api/auth/resetpassword", {
        password: password,
        confirm_password: password,
        token: searchParam.get("token"),
        email: searchParam.get("email"),
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, { theme: "colored" });
        } else if (res.status === 400) {
          toast.error(res.data.error.password);
        } else {
          toast.error("Something went wrong", { theme: "colored" });
        }
      })
      .catch((err) => {
        console.log(err);
        setLeading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[500px] p-5 rounded-md shadow-md">
          <h1 className="text-xl font-medium flex justify-center items-center">
            Reset Password
          </h1>
          <p className="mt-2 text-gray-500 text-center">
            Don&rsquo;t worry! We will reset your Password
          </p>
          <form onSubmit={submit}>
            <div className="mt-5">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="password" className="block">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your confirm password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className="text-pink-600 text-xs">{error?.password}</span>
            <button
              type="button"
              className="inline-flex mt-5 w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              onClick={submit}
            >
              {leading ? "Loading..." : "Submit"}
            </button>
            <div className="mt-2 text-center underline">
              <Link href="/login">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [leading, setLeading] = useState(false);
  const [error, setError] = useState<loginErrorType>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLeading(true);
    axios
      .post("/api/auth/forgetpassword", { email })
      .then((res) => {
        setLeading(false);
        const response = res.data;
        if (response.status == 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status == 404) {
          setError(response.error);
        } else {
          toast.success(response.message, { theme: "colored" });
        }
      })
      .catch((error) => {
        setLeading(false);
        toast.error("Something went wrong", { theme: "colored" });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[500px] p-5 rounded-md shadow-md">
          <h1 className="text-xl font-medium flex justify-center items-center">
            Forget Password
          </h1>
          <p className="mt-2 text-gray-500 text-center">
            Don&rsquo;t worry! We will reset your Password
          </p>
          <form onSubmit={submit}>
            <div className="mt-5">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="abhi@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className="text-pink-600">{error?.email}</span>
            <button
              type="button"
              className="inline-flex mt-5 w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              onClick={submit}
            >
              {leading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgetPass;

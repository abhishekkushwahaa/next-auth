"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [auth, setAuth] = useState<registerErrorType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<registerErrorType>({});

  const submit = async () => {
    setLoading(true);
    console.log("Auth", auth);
    axios
      .post("/api/auth/register", auth)
      .then((res) => {
        setLoading(false);

        const response = res.data;

        if (response.status == 200) {
          router.push(`/login?message=${response.message}`);
        } else if (response?.status == 400) {
          setError(response?.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // To Sign in with Github
  const signInWithGithub = () => {
    signIn("github", {
      callbackUrl: "/",
      redirect: true,
    });
  };

  const signInWithGoogle = async () => {
    await signIn("google", {
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <Image src="/favicon.ico" alt="logo" width="64" height="64" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    onChange={(e) => setAuth({ ...auth, name: e.target.value })}
                  ></input>
                  <span className="text-pink-500 text-xs font-italic">
                    {error?.name}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={(e) =>
                      setAuth({ ...auth, email: e.target.value })
                    }
                  ></input>
                  <span className="text-pink-500 text-xs font-italic">
                    {error?.email}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(e) =>
                      setAuth({ ...auth, password: e.target.value })
                    }
                  ></input>
                  <span className="text-pink-500 text-xs font-italic">
                    {error?.password}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm_password"
                    onChange={(e) =>
                      setAuth({
                        ...auth,
                        password_confirmation: e.target.value,
                      })
                    }
                  ></input>
                  <span className="text-pink-500 font-italic">
                    {error?.password_confirmation}
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className={`inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ${
                    loading ? "bg-gray" : "bg-black"
                  }`}
                  onClick={submit}
                >
                  {loading ? "Processing" : "Register"}
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <p className="text-center text-sm text-gray-600"> --OR-- </p>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={signInWithGoogle}
            >
              <span className="mr-2 inline-block"></span>
              Continue with Google
            </button>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={signInWithGithub}
            >
              <span className="mr-2 inline-block"></span>
              Continue with Github
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

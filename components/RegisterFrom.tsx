"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { signIn } from "next-auth/react";
import { SubmitButton } from "./SubmitBtn";

export default function RegisterForm() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const axios = useAxiosAuth();

  const validateLinkedinUrl = (e) => {
    const msg = "Invalid Linkedin Profile Link";

    setError("");

    e.target.classList.remove("input-error");
    const regEx = new RegExp(
      "http(s)?://([w]+.)?linkedin.com/in/[A-z0-9_-]+/?"
    );
    if (!regEx.test(e.target.value.trim())) {
      setError(msg);
      e.target.classList.add("input-error");
      return;
    }
  };

  const validateEmail = (e) => {
    const msg = "Invalid Email";
    setError("");

    e.target.classList.remove("input-error");
    const regEx = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    if (!regEx.test(e.target.value.trim())) {
      setError(msg);
      e.target.classList.add("input-error");
      return;
    }
  };

  // new line: &nbsp;
  const validatePassword = (e) => {
    const msg = `Week Password, must contain at least 8 characters`;

    setError("");
    e.target.classList.remove("input-error");
    const regEx = new RegExp("^(?=.*[a-z]).{8,}$");
    if (!regEx.test(e.target.value.trim())) {
      setError(msg);
      e.target.classList.add("input-error");
      return;
    }
  };

  async function handleSubmit() {

    try {
      const newUser = {
        linkedinUrl,
        email,
        password,
      };

      const res = await axios.post("/auth/signup", newUser);

      await signIn("credentials", {
        email,
        password,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      console.log("error?.response?.data?.message", error?.response?.data?.message);
      setError(error?.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setError("");
      }, 10_000);
      return;
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-[90%]  max-w-2xl text-center">
        <h1 className="text-2xl font-bold my-2">Register</h1>

        <form action={handleSubmit} className="flex flex-col gap-6 mt-6 ">
          <div
            className={` flex justify-center w-full  ${
              !error ? "opacity-0" : ""
            } `}
          >
            <p className="w-4/5 text-sm py-1 px-3 rounded-md bg-red-200 bg-opacity-20 text-red-600">
              {error || "good"}
            </p>
          </div>

          <input
            className={`input  input-success `}
            onChange={(e) => setLinkedinUrl(e.target.value.trim())}
            type="text"
            placeholder="LinkedIn Profile Link"
            required
            onBlur={validateLinkedinUrl}
            name="linkedinUrl"
          />
          <input
            className="input input-success "
            onChange={(e) => setEmail(e.target.value.trim())}
            type="text"
            placeholder="Email"
            required
            onBlur={validateEmail}
            name="email"
          />
          <input
            className="input input-success"
            onChange={(e) => setPassword(e.target.value.trim())}
            type="password"
            placeholder="Password"
            required
            onBlur={validatePassword}
            name="password"
          />
          <SubmitButton
            disabled={
              error || !email || !password || !linkedinUrl
                ? true
                : false
            }
            className={`btn bg-green-600 text-white font-bold cursor-pointer px-6 py-2  disabled:btn-disabled `}
          >
            Register
          </SubmitButton>

          <p className="text-sm m-3 mt-0.5 ">
            Already have an account?
            <Link
              href={"/auth/signin"}
              className="underline font-medium text-green-500"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

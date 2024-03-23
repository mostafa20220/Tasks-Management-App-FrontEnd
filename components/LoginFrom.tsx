"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./SubmitBtn";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        console.log("res", res);
        console.log("res.error", res.error);
        setError("Invalid Credentials");
        setTimeout(() => {
          setError("");
        }, 5_000);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 5_000);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-[90%]  max-w-2xl text-center">
        <h1 className="text-2xl font-bold my-2">Login</h1>
        <form action={handleSubmit} className="flex flex-col gap-6 mt-6">
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
            className="input  input-success "
            onChange={(e) => setEmail(e.target.value.trim())}
            value={email}
            type="text"
            placeholder="Email"
            name="email"
            required
          />
          <input
            className="input  input-success "
            onChange={(e) => setPassword(e.target.value.trim())}
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <SubmitButton
            className={`btn bg-green-600 text-white font-bold cursor-pointer px-6 py-2  
               disabled:btn-disabled            `}
            disabled={error || !email || !password ? true : false}
          >
            Login
          </SubmitButton>

          <p className="text-sm m-3 ">
            Don&apos;t have an account?
            <Link href={"/auth/signup"}>
              <span className="underline font-medium"> Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

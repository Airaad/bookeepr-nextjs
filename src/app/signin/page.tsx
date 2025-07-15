"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!res?.error) {
        router.push("/");
      } else {
        if (res.status === 401) {
          setError("Invalid Credentials, try again!");
        } else if (res.status === 400) {
          setError("Missing Credentials!");
        } else if (res.status === 404) {
          setError("Account not found!");
        } else if (res.status === 403) {
          setError("Forbidden!");
        } else {
          setError("oops something went wrong..!");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Half - Sign In */}
      <div className="w-full md:w-1/2 bg-[#212121] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl text-white font-medium mb-6 text-center">
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="text-white mt-1 w-80 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="text-white mt-1 w-80 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-80 text-white py-2 rounded-md transition ${
                !loading ? "bg-green-500 hover:bg-green-700" : "bg-gray-500"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>

      {/* Right Half - Placeholder */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        {/* Add your graphic or image here */}
        <span className="text-gray-400 text-xl">
          Graphic / Illustration goes here
        </span>
      </div>
    </div>
  );
}

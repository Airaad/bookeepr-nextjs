"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post("/api/signup", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        router.push("/signin");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen w-full">
      {/* Left Half - Sign Up Form */}
      <div className="w-full md:w-1/2 bg-[#212121] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-white text-3xl font-medium mb-6 text-center">
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="text-white mt-1 w-80 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

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
                loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/signin" className="text-white hover:underline">
              Sign in
            </Link>
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>

      {/* Right Half - Placeholder for future image/graphic */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        {/* Add your graphic here */}
        <span className="text-gray-400 text-xl">
          Graphic / Illustration goes here
        </span>
      </div>
    </div>
  );
}

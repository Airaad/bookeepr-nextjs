"use client";
import { signIn } from "next-auth/react";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full text-white py-2 rounded-md  transition ${
              !loading ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"
            }`}
          >
            {loading ? "Singing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
        {error && (
          <div>
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

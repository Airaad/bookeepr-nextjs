"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import LoadingSpinner from "./icons/LoadingSpinner";

interface AuthenticationProps {
  isSignUp?: boolean;
  redirectedUrl?: string;
}

export default function AuthPage({
  isSignUp = false,
  redirectedUrl = "/",
}: AuthenticationProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("google", {
        callbackUrl: redirectedUrl,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const title = isSignUp
    ? "🙌Start your journey with us"
    : "👋Glad to see you again!";
  const actionText = isSignUp ? "Sign up" : "Sign in";
  const linkText = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const linkHref = isSignUp ? "/signin" : "/signup";
  const linkActionText = isSignUp ? "Sign in" : "Sign up";

  return (
    <div className="flex h-screen w-full">
      <div className="w-full md:w-1/2 bg-[#212121] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center gap-2 my-8">
              <Image
                src="/logo/logo_svg.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <h1 className="text-3xl text-white font-medium">BooKeeper</h1>
            </div>

            <button
              disabled={loading}
              onClick={handleGoogleAuth}
              className={`w-80 text-white py-2 rounded-md transition flex items-center justify-center gap-3 ${
                !loading ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"
              }`}
            >
              {loading && <LoadingSpinner />}

              <Image
                src="/logo/google-icon-logo-svgrepo-com.svg"
                alt="Google logo"
                width={20}
                height={20}
              />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-gray-400 text-sm text-center mt-4">
            {linkText}{" "}
            <Link href={linkHref} className="text-white hover:underline">
              {linkActionText}
            </Link>
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-[#faf7f0] items-center justify-center">
        {/*image*/}
        <span className="text-gray-400 text-xl">
          <h2 className="text-3xl font-medium text-black text-center mb-6">
            {title}
          </h2>
        </span>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import ArrowUpRight from "./icons/ArrowUpRight";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(authentication-route)/auth/[...nextauth]/options";

const HeroSection = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section className="bg-[#faf7f0] pt-20 px-4">
      <div className="max-w-2xl mx-auto text-center mt-14">
        <h1 className="text-4xl md:text-5xl font-normal text-gray-900 leading-tight">
          Where readers become thoughtful writers
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          BooKeeper helps you take smart, structured notes from the books you
          read — and reflect deeply on what matters.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          {!session ? (
            <Link
              href="/signup"
              className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-xl shadow transition"
            >
              <div className="flex items-center justify-center gap-2">
                <span> Get Started Free</span>
                <ArrowUpRight />
              </div>
            </Link>
          ) : (
            <Link
              href="/my-books-page"
              className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-xl shadow transition"
            >
              <div className="flex items-center justify-center gap-2">
                <span>My Library</span>
                <ArrowUpRight />
              </div>
            </Link>
          )}

          {/* <Link
            href="/demo"
            className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold px-6 py-3 rounded-md shadow"
          >
            Book a Demo
          </Link> */}
        </div>
      </div>

      <div className="mt-16 flex justify-center relative">
        <div className="rounded-2xl p-1 bg-gradient-to-r from-green-200 via-blue-100 to-green-300 shadow-lg">
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/images/hero_image.png"
              alt="Dashboard preview"
              width={1000}
              height={700}
              className="w-full h-auto p-8"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Users, Target, Lightbulb, Heart } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const StepCard = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <div className="relative">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {number}
        </div>
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-green-700" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default async function About() {
  const session = await getServerSession();
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf7f0" }}>
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex justify-center items-center gap-1">
                <Image
                  src="/logo/logo_svg.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <span className="text-3xl font-semibold tracking-tighter text-gray-800">
                  BooKeeper
                </span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Personal
              <span className="text-green-700 block">Reading Companion</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform the way you engage with books. Capture thoughts, track
              your reading journey, and build a meaningful library of your
              literary experiences.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Follow these easy steps to begin your
              organized reading journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <StepCard
              number={1}
              title="Add Your Books"
              description="After logging in, start by searching for your favorite book and selecting it — the app will automatically fill in details like the title, author, publication year, and cover image."
            />
            <StepCard
              number={2}
              title="Rate & Review"
              description="Give each book a star rating and write detailed notes about your experience, favorite quotes, or key takeaways."
            />
            <StepCard
              number={3}
              title="Explore & Discover"
              description="Browse your growing library, search for specific books, filter by ratings, and rediscover books that made an impact."
            />
          </div>
        </div>
      </div>

      {/* Why choose us Section */}
      <div className="py-16 lg:py-24" style={{ backgroundColor: "#faf7f0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits that make us the perfect companion for your
              reading journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              icon={Heart}
              title="Meaningful Engagement"
              description="Transform passive reading into active reflection and deeper understanding."
            />
            <BenefitCard
              icon={Target}
              title="Stay Organized"
              description="Keep all your reading experiences organized and easily accessible in one place."
            />
            <BenefitCard
              icon={Lightbulb}
              title="Capture Insights"
              description="Never lose those brilliant thoughts and insights that come while reading."
            />
            <BenefitCard
              icon={Users}
              title="Personal Growth"
              description="Track your reading evolution and see how your tastes and interests develop."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Reading Experience?
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Join the readers who have already discovered the joy of organized,
            meaningful reading with our platform.
          </p>
          <Link
            href={`${session ? "/my-books-page" : "/signup"}`}
            className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg cursor-pointer"
          >
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </div>
  );
}

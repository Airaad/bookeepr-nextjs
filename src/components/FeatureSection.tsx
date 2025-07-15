import { ReactNode } from "react";
import Filter from "./icons/Filter";
import Bookmark from "./icons/Bookmark";
import User from "./icons/User";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Filter />,
    title: "Effortlessly track clicks and conversions",
    description:
      "You can create a link in seconds that automatically attributes revenue to specific content. No complicated setup or tracking scripts required.",
  },
  {
    icon: <Bookmark />,
    title: "Save once, reuse everywhere.",
    description:
      "Save your most commonly used links for reuse later. With one click, generate a new link for each book or idea to track what resonates most.",
  },
  {
    icon: (
      <div className="flex items-center gap-2">
        {/* Replace these with your own images or integrations */}
        <img src="/logos/kit.svg" className="h-6" alt="Kit" />
        <img src="/logos/stripe.svg" className="h-6" alt="Stripe" />
        <img src="/logos/zapier.svg" className="h-6" alt="Zapier" />
      </div>
    ),
    title: "Powerful integrations",
    description:
      "Connect with tools you already use. Automatically attribute book insights and notes wherever your audience acts.",
  },
  {
    icon: <User />,
    title: "Get the full story of your audience",
    description:
      "Track the journey from first idea to implementation, with detailed insights on what content inspires best.",
  },
  {
    icon: (
      <div className="flex items-center gap-1">
        <kbd className="bg-gray-100 px-2 py-1 rounded font-mono text-sm border">
          C
        </kbd>
      </div>
    ),
    title: "Keyboard shortcuts for everything",
    description:
      "Fly through the app with intuitive shortcuts. Create notes, tag books, or connect ideas faster than ever.",
  },
  {
    icon: (
      <div className="flex items-center gap-1">
        <kbd className="bg-gray-100 px-2 py-1 rounded font-mono text-sm border">
          ⌘
        </kbd>
        <kbd className="bg-gray-100 px-2 py-1 rounded font-mono text-sm border">
          K
        </kbd>
      </div>
    ),
    title: "Unlock superpowers",
    description:
      "Access your entire library and actions with a universal command menu — search and perform in seconds.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-[#faf7f0] py-24 md:pt-32 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl  font-semibold text-gray-900 mb-12">
          Capture book insights instantly
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 text-left shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="text-green-700 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

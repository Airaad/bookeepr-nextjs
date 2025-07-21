import { ReactNode } from "react";
import Bookmark from "./icons/Bookmark";
import LockIcon from "./icons/LockIcon";
import BookSearchIcon from "./icons/BookSearchIcon";
import CycleIcon from "./icons/CycleIcon";
import LikeIcon from "./icons/LikeIcon";
import MobileIcon from "./icons/MobileIcon";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <LockIcon />,
    title: "Google Login – Secure & Password-Free",
    description:
      "Easily sign in using your Google account. No need to remember passwords – your data is safe and access is just a click away.",
  },
  {
    icon: <BookSearchIcon />,
    title: "Smart Book Search",
    description:
      "Search by book title, author, or ISBN. Instantly fetch book covers and details using the Open Library API – no need to fill out information manually.",
  },
  {
    icon: <Bookmark />,
    title: "Take Notes on Books You Read",
    description:
      "Write and save personal notes for each book you’re reading. Whether it’s a quote, a thought, or a summary – keep everything organized in one place.",
  },
  {
    icon: <CycleIcon />,
    title: "Book Cover & Info Auto-Fill",
    description:
      "As soon as you select a book, its cover, title, author, and published year are automatically filled in to keep your entries clean and professional.",
  },
  {
    icon: <LikeIcon />,
    title: "Rate Your Reads",
    description:
      "Add a personal rating for each book you’ve read, so you can look back at your favorites later.",
  },
  {
    icon: <MobileIcon />,
    title: " Access From Any Device",
    description:
      "Your notes and reading history are saved in the cloud. Switch between devices – laptop, phone, or tablet – and your data is always with you.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-[#faf7f0] py-24 md:pt-32 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl  font-semibold text-gray-900 mb-12">
          Highlights of Your Book Journey
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

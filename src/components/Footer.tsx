import Link from "next/link";
import Heart from "./icons/Heart";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#faf7f0] text-sm text-gray-700 py-12 px-6 border-t-2 border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-1 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-xl text-gray-900">
            <Image src="/logo/logo_svg.svg" alt="Logo" width={32} height={32} />
            BooKeeper
          </div>
          <p className="flex items-center gap-1 text-gray-600">
            Made with <Heart /> by Airaad.
          </p>
          <p className="text-gray-500">Copyright 2025 BooKeeper.</p>
        </div>

        <div className="space-y-2 mt-2">
          <h4 className="font-semibold text-gray-900">About Us</h4>
          <Link href="/pricing" className="text-gray-600 hover:underline">
            Pricing
          </Link>
        </div>

        <div className="space-y-2 mt-2">
          <h4 className="font-semibold text-gray-900">Resources</h4>
          <Link href="/blog" className="text-gray-600 hover:underline">
            Blog
          </Link>
        </div>

        <div className="space-y-2 mt-2">
          <h4 className="font-semibold text-gray-900">Contact Us</h4>
          <Link
            href="mailto:sheikhairaad@gmail.com"
            className="text-gray-600 hover:underline"
          >
            Email
          </Link>
        </div>

        <div className="space-y-2 mt-2">
          <h4 className="font-semibold text-gray-900">Legal</h4>
          <Link href="/privacy" className="text-gray-600 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

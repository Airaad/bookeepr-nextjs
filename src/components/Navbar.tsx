"use client";
import Link from "next/link";
import React, { useState } from "react";
import MenuIcon from "./icons/MenuIcon";
import CrossIcon from "./icons/CrossIcon";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full bg-[#faf7f0]  fixed top-0 left-0 z-50">
      <div className="hidden max-w-7xl mx-auto px-4 py-5 sm:flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo/logo_svg.svg" alt="Logo" width={32} height={32} />
          <span className="text-3xl font-semibold tracking-tighter text-gray-800">
            BooKeeper
          </span>
        </Link>

        <div className="hidden sm:flex space-x-6">
          <Link href="/about" className="text-gray-700 hover:text-green-700">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-700">
            Contact
          </Link>
          <Link href="/signin" className="text-gray-700 hover:text-green-700">
            Sign In
          </Link>
        </div>
      </div>
      <div className="sm:hidden bg-[#faf7f0] w-full px-2 py-2 fixed top-0 left-0">
        {!isOpen && (
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center ml-2">
              <Image
                src="/logo/logo_svg.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-semibold text-gray-800">
                BooKeeper
              </span>
            </Link>

            <div
              className=" p-2 cursor-pointer "
              onClick={() => setIsOpen(true)}
            >
              <MenuIcon />
            </div>
          </div>
        )}

        <div
          className={`fixed top-0 left-0 h-screen w-52 px-5 bg-[#2B3939] z-20 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="my-5 flex items-center justify-between">
            <span className="text-white text-2xl">BooKeeper</span>
            <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <CrossIcon />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Link href="about">
              <span className="text-white cursor-pointer hover:text-green-500">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-white cursor-pointer hover:text-green-500">
                Contact
              </span>
            </Link>
            <Link href="/signin">
              <span className="text-white cursor-pointer hover:text-green-500">
                Signin
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

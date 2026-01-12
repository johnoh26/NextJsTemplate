"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              } transition-colors pb-1`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`${
                isActive("/products")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              } transition-colors pb-1`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`${
                isActive("/about")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              } transition-colors pb-1`}
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className={`${
                isActive("/careers")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              } transition-colors pb-1`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive("/contact")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              } transition-colors pb-1`}
            >
              Contact Us
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/contact?demo=true"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md ${
                isActive("/")
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 rounded-md ${
                isActive("/products")
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md ${
                isActive("/about")
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/careers"
              className={`block px-3 py-2 rounded-md ${
                isActive("/careers")
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md ${
                isActive("/contact")
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/contact?demo=true"
              className="block px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

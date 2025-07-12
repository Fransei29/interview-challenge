"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/assets/MedicareLogoNavbar.png" 
                alt="MediCare Hub" 
                width={60} 
                height={60}
                className="rounded-lg"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Who We Are
            </Link>
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 
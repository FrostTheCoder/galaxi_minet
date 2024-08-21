"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Galaxi.
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/transits" className="hover:underline">
              Transits
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/pricing" className="hover:underline">
              Pricing
            </Link>

            <SignedIn>
              <UserButton
                userProfileMode="modal"
                userProfileUrl="/dashboard"
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '40px',
                      height: '40px',
                    },
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/transits" className="block hover:underline">
              Transits
            </Link>
            <Link href="/dashboard" className="block hover:underline">
              Dashboard
            </Link>
            <Link href="/pricing" className="block hover:underline">
              Pricing
            </Link>
            <SignedIn>
              <UserButton
                userProfileMode="modal"
                userProfileUrl="/dashboard"
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '40px',
                      height: '40px',
                    },
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="block hover:underline">
                Sign In
              </Link>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

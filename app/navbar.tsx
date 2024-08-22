"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full py-4 px-6 md:px-8 bg-background shadow-md">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary hover:white-500">
            Galaxi.
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href='/transits' className="text-foreground hover:text-primary transition-colors">Available Transits</Link>
            <Link href='/pricing' className="text-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href='/dashboard' className="text-foreground hover:text-primary transition-colors">Dashboard</Link>

            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '2.5rem',
                      height: '2.5rem'
                    }
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign in</Button>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-foreground hover:text-primary">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href='/transits' className="block text-foreground hover:text-primary transition-colors">Available Transits</Link>
            <Link href='/pricing' className="block text-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href='/dashboard' className="block text-foreground hover:text-primary transition-colors">Dashboard</Link>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '2.5rem',
                      height: '2.5rem'
                    }
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Sign in</Button>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

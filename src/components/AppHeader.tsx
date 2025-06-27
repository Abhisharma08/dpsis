"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: "#highlights", label: "Benefits" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#home", label: "Enquire" },
];

const AppHeader = () => {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="https://cdn.lugc.link/ba71d94d-c3cf-44c7-9764-294540f5cc26/-/preview/108x76/-/format/auto/" 
            alt="DPSIS Logo" 
            width={108} 
            height={76} 
            priority 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
           {navLinks.map((link) => (
             <a key={link.href} href={link.href} className="text-foreground hover:text-primary transition-colors font-medium">{link.label}</a>
           ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <a
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

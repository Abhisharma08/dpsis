
import Link from 'next/link';
import Image from 'next/image';

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
        <nav className="hidden md:flex gap-4">
           <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
           <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
           <a href="#home" className="text-foreground hover:text-primary transition-colors">Enquire Now</a>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;

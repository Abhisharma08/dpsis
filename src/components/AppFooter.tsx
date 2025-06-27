
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Custom SVG components for social media icons with official colors

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" className="h-6 w-6">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <defs>
      <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-1.631c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.545 15.259.533 12 .533z" />
    <path fill="url(#instagram-gradient)" d="M12 7.163c-2.668 0-4.837 2.169-4.837 4.837s2.169 4.837 4.837 4.837 4.837-2.169 4.837-4.837-2.169-4.837-4.837-4.837zm0 8.042c-1.772 0-3.205-1.433-3.205-3.205s1.433-3.205 3.205-3.205 3.205 1.433 3.205 3.205-1.433 3.205-3.205 3.205z" />
    <path fill="url(#instagram-gradient)" d="M16.949 5.052a1.2 1.2 0 1 1-1.697 1.697 1.2 1.2 0 0 1 1.697-1.697z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" className="h-6 w-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="h-6 w-6">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="h-6 w-6">
    <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6s0-.3.1-.4c.1-.1.2-.2.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3-.1-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.5.7 3.6 2.6.5.3.9.5 1.2.6.5.2 1 .2 1.3.1.4-.1 1.5-.6 1.7-1.2.2-.5.2-1 .1-1.1s-.2-.2-.4-.3zM12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18.2c-4.5 0-8.2-3.7-8.2-8.2S7.5 3.8 12 3.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"></path>
  </svg>
);


const socialLinks = [
  { href: "https://www.facebook.com/share/1AmU9RMQf7/", icon: FacebookIcon, label: "Facebook" },
  { href: "https://www.instagram.com/dpsis_singapore?igsh=ajBzMHJiN3lrMW96", icon: InstagramIcon, label: "Instagram" },
  { href: "https://www.linkedin.com/company/100052816/admin/dashboard/", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://youtube.com/@dpsinternationalschool9246?si=c3TVjDqBfZrxLYZb", icon: YoutubeIcon, label: "YouTube" },
  { href: "https://api.whatsapp.com/send?phone=6589322360", icon: WhatsappIcon, label: "WhatsApp" },
];

const AppFooter = () => {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground space-y-8 py-8">
        
        {/* PEI Registration and Education Partners */}
        <div>
          <p className="text-xs uppercase tracking-wider text-foreground/70 font-semibold">PEI REGISTRATION NO. -201109459N | VALIDITY: 22 AUGUST 2024 TO 21 AUGUST 2028</p>
          <div className="flex justify-center mt-6">
            <Image 
              src="https://8b628c1d24.imgdist.com/pub/bfra/3ropxvtg/l9g/41a/h3s/WhatsApp%20Image%202025-06-11%20at%2011.52.52%20AM.jpeg"
              alt="Singapore SME 500 Award 2024"
              width={500}
              height={700}
              className="rounded-md shadow-lg w-full max-w-md h-auto"
              data-ai-hint="award certificate"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <p className="font-semibold text-lg text-primary">Follow us and stay updated on our social media platforms!</p>
          <div className="flex justify-center gap-3 mt-4">
            {socialLinks.map((social) => (
              <Button key={social.label} asChild variant="outline" size="icon" className="rounded-full bg-background border-primary/20 hover:bg-primary/10 w-12 h-12 transition-all hover:shadow-md hover:-translate-y-1">
                <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  <social.icon />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Copyright Footer */}
      <div className="bg-primary/5 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="font-semibold">&copy; {new Date().getFullYear()} DPSIS. All rights reserved.</p>
          <p className="text-sm mt-1">Empowering young minds for a brighter future.</p>
          <div className="mt-2 text-xs">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledBy?: string; // For accessibility, link to a heading within the section
  containerClassName?: string;
}

export const SectionWrapper = ({ children, className, id, ariaLabelledBy, containerClassName }: SectionWrapperProps) => {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={cn("py-16 md:py-24", className)}>
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
};

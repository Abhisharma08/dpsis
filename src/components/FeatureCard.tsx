import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: LucideIcon; // Icon is optional
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <Card className={cn("h-full shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-white border border-accent/10", className)}>
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex flex-col items-start gap-5">
          {Icon && <Icon className="w-12 h-12 p-2.5 rounded-xl bg-secondary text-accent flex-shrink-0" />}
          <CardTitle className="text-xl font-headline text-accent">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className="text-foreground/80 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

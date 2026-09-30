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
    <Card className={cn("h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg overflow-hidden bg-background/50 backdrop-blur-md border border-primary/10", className)}>
      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-8 h-8 text-primary flex-shrink-0" />}
          <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className="text-foreground/80 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

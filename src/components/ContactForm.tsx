
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { submitEnquiry, type EnquiryFormInput } from "@/ai/flows/submit-inquiry-flow";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  parentName: z.string().min(2, { message: "Parent's name must be at least 2 characters." }).max(100),
  childName: z.string().min(2, { message: "Child's name must be at least 2 characters." }).max(100),
  grade: z.string().min(1, { message: "Grade is required." }).max(50),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+?[0-9\s-()]{10,20}$/, { message: "Please enter a valid phone number." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  isPopup?: boolean;
  className?: string;
}

export default function ContactForm({ onSuccess, isPopup = false, className }: ContactFormProps) {
  const router = useRouter();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      childName: "",
      grade: "",
      email: "",
      phone: "",
    },
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  async function onSubmit(data: EnquiryFormInput) {
    setSubmissionError(null);
    try {
      const result = await submitEnquiry(data);
      if (result.success) {
        if (onSuccess) {
          onSuccess();
        }
        router.push('/thank-you');
      } else {
        const message = result.message || "Submission failed. Please try again.";
        setSubmissionError(message);
        toast({
          title: "Submission Failed",
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      setSubmissionError(errorMessage);
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className={cn(
      "w-full max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden",
      !isPopup && "bg-black/30 backdrop-blur-xl border border-white/20 text-white",
      isPopup && "shadow-none border-none",
      className
    )}>
      {!isPopup && (
        <CardHeader className="p-8 bg-transparent">
          <CardTitle className="text-3xl font-headline text-white text-center">Ready to Take the Next Step?</CardTitle>
          <CardDescription className="text-center text-base pt-2 text-white/90">
            Fill out the form below to learn more about the Bridge Program or to schedule a visit.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn("p-8", isPopup && "p-0 pt-4")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPopup ? "text-foreground/80" : "text-white/90")}>Parent's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} className={cn("focus-visible:ring-accent", isPopup ? "bg-background placeholder:text-foreground/60 border-border" : "bg-black/20 placeholder:text-white/70 border-white/30 text-white" )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(isPopup ? "text-foreground/80" : "text-white/90")}>Child's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} className={cn("focus-visible:ring-accent", isPopup ? "bg-background placeholder:text-foreground/60 border-border" : "bg-black/20 placeholder:text-white/70 border-white/30 text-white" )} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPopup ? "text-foreground/80" : "text-white/90")}>Child's Current/Last Grade</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., K2, Grade 1" {...field} className={cn("focus-visible:ring-accent", isPopup ? "bg-background placeholder:text-foreground/60 border-border" : "bg-black/20 placeholder:text-white/70 border-white/30 text-white" )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPopup ? "text-foreground/80" : "text-white/90")}>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} className={cn("focus-visible:ring-accent", isPopup ? "bg-background placeholder:text-foreground/60 border-border" : "bg-black/20 placeholder:text-white/70 border-white/30 text-white" )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(isPopup ? "text-foreground/80" : "text-white/90")}>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} className={cn("focus-visible:ring-accent", isPopup ? "bg-background placeholder:text-foreground/60 border-border" : "bg-black/20 placeholder:text-white/70 border-white/30 text-white" )} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 rounded-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              disabled={form.formState.isSubmitting}
              aria-label="Submit enquiry form"
            >
              <Send className="mr-2 h-5 w-5" />
              {form.formState.isSubmitting ? "Sending..." : "Submit Enquiry"}
            </Button>
          </form>
        </Form>
        {submissionError && !form.formState.isSubmitting && (
           <div className="mt-4 p-4 rounded-md bg-destructive/20 text-white border border-destructive/30 text-center">
            {submissionError}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

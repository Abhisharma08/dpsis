
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
import { submitInquiry, type InquiryFormInput } from "@/ai/flows/submit-inquiry-flow";

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

  const [submissionStatus, setSubmissionStatus] = useState<null | 'success' | 'error'>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  async function onSubmit(data: InquiryFormInput) {
    setSubmissionStatus(null);
    setSubmissionMessage("");
    try {
      const result = await submitInquiry(data);
      if (result.success) {
        setSubmissionStatus('success');
        setSubmissionMessage(result.message || "Your inquiry has been submitted successfully!");
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(result.message || "Submission failed. Please try again.");
        toast({
          title: "Submission Failed",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setSubmissionStatus('error');
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      setSubmissionMessage(errorMessage);
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className={cn(
      "w-full max-w-2xl mx-auto shadow-2xl border-2 border-primary/20 rounded-xl overflow-hidden",
      isPopup && "shadow-none border-none",
      className
    )}>
      {!isPopup && (
        <CardHeader className="bg-primary/5 p-8">
          <CardTitle className="text-3xl font-headline text-primary text-center">Ready to Take the Next Step?</CardTitle>
          <CardDescription className="text-center text-muted-foreground text-base pt-2">
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
                    <FormLabel className="text-foreground/80">Parent's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} className="bg-background border-border focus:ring-accent" />
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
                    <FormLabel className="text-foreground/80">Child's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} className="bg-background border-border focus:ring-accent" />
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
                  <FormLabel className="text-foreground/80">Child's Current/Last Grade</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., K2, Grade 1" {...field} className="bg-background border-border focus:ring-accent" />
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
                  <FormLabel className="text-foreground/80">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background border-border focus:ring-accent" />
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
                  <FormLabel className="text-foreground/80">Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} className="bg-background border-border focus:ring-accent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 rounded-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={form.formState.isSubmitting}
              aria-label="Submit inquiry form"
            >
              <Send className="mr-2 h-5 w-5" />
              {form.formState.isSubmitting ? "Sending..." : "Submit Inquiry"}
            </Button>
          </form>
        </Form>
        {submissionStatus === 'success' && (
          <div className="mt-4 p-4 rounded-md bg-primary/10 text-primary border border-primary/20 text-center">
            {submissionMessage}
          </div>
        )}
        {submissionStatus === 'error' && !form.formState.isSubmitting && (
           <div className="mt-4 p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-center">
            {submissionMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

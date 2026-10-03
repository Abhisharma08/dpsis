
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { enquirySchema, type EnquiryFormInput } from "@/lib/enquiry-schema";
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
import { submitEnquiry } from "@/ai/flows/submit-inquiry-flow";
import { useRouter } from "next/navigation";

const formSchema = enquirySchema;

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
      const errorMessage = "Unable to submit your enquiry. Please try again.";
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
      "w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border border-accent/10 bg-white text-foreground",
      !isPopup && "shadow-[0_16px_60px_-20px_rgba(28,43,70,0.22)]",
      isPopup && "shadow-none border-none",
      className
    )}>
      {!isPopup && (
        <CardHeader className="p-6 sm:p-8 pb-0 sm:pb-0 bg-transparent">
          <CardTitle className="text-3xl font-headline text-accent text-left">Ready to Take the Next Step?</CardTitle>
          <CardDescription className="text-left text-sm leading-relaxed pt-2 text-muted-foreground">
            Fill out the form below to learn more about the Bridge Program or to schedule a visit.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn("p-6 sm:p-8", isPopup && "p-0 pt-4")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" aria-busy={form.formState.isSubmitting}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-foreground text-sm font-medium"}>Parent's Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" maxLength={100} placeholder="Parent name" {...field} className={"h-12 rounded-xl bg-background/60 border-border placeholder:text-muted-foreground focus-visible:ring-accent"} />
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
                    <FormLabel className={"text-foreground text-sm font-medium"}>Child's Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="off" maxLength={100} placeholder="Child name" {...field} className={"h-12 rounded-xl bg-background/60 border-border placeholder:text-muted-foreground focus-visible:ring-accent"} />
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
                  <FormLabel className={"text-foreground text-sm font-medium"}>Child's Current/Last Grade</FormLabel>
                  <FormControl>
                    <Input maxLength={50} placeholder="e.g., K2, Grade 1" {...field} className={"h-12 rounded-xl bg-background/60 border-border placeholder:text-muted-foreground focus-visible:ring-accent"} />
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
                  <FormLabel className={"text-foreground text-sm font-medium"}>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" maxLength={254} placeholder="Your email" {...field} className={"h-12 rounded-xl bg-background/60 border-border placeholder:text-muted-foreground focus-visible:ring-accent"} />
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
                  <FormLabel className={"text-foreground text-sm font-medium"}>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" autoComplete="tel" maxLength={25} placeholder="10 digit mobile number" {...field} className={"h-12 rounded-xl bg-background/60 border-border placeholder:text-muted-foreground focus-visible:ring-accent"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base h-12 rounded-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
              disabled={form.formState.isSubmitting}
              aria-label="Submit enquiry form"
            >
              <Send className="mr-2 h-5 w-5" />
              {form.formState.isSubmitting ? "Sending..." : "Submit Enquiry"}
            </Button>
          </form>
        </Form>
        {submissionError && !form.formState.isSubmitting && (
           <div role="alert" className="mt-4 p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/30 text-center">
            {submissionError}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

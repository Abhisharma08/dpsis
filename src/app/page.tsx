
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionWrapper } from '@/components/SectionWrapper';
import ContactForm from '@/components/ContactForm';
import { FeatureCard } from '@/components/FeatureCard';
import {
  Users, BookOpenText, LaptopMinimal, BrainCircuit, Landmark, Sparkles, ChevronRight,
  School, Banknote, Palette, Building2, GraduationCap, ExternalLink, HeartHandshake, Target, Clock3, Percent, CheckCircle2, MessageCircleQuestion, Quote, Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from 'react';

const faqItems = [
  {
    id: "faq1",
    question: "Who is eligible for the DPSIS Bridge Program?",
    answer: "K2 graduates aged 5+ can join in January and transition to Primary 2 by April, after fulfilling outcomes.",
  },
  {
    id: "faq2",
    question: "What is the purpose of the Bridge Program?",
    answer: "It helps K2 students catch up academically and transition smoothly into Primary 2 in just three months, ensuring they are well-prepared for the next academic stage.",
  },
  {
    id: "faq3",
    question: "How is the Bridge Program different from Primary 1?",
    answer: "Students follow a specially designed, focused curriculum that builds only the essential Primary 1 concepts needed for Primary 2. It's an accelerated path concentrating on core competencies.",
  },
  {
    id: "faq4",
    question: "What kind of support will my child receive?",
    answer: "DPSIS offers extra academic help, differentiated instructional strategies tailored to individual learning styles, and regular feedback to ensure your child progresses confidently and addresses any challenges promptly.",
  },
  {
    id: "faq5",
    question: "Can the Bridge Program help save an academic year?",
    answer: "Yes! It allows students to join Primary 2 in April, effectively skipping a full year of Primary 1, without compromising on foundational learning.",
  },
];

const whyChooseItems = [
  { icon: HeartHandshake, title: "Strong Support System", description: "New joiners receive extra practice material and close teacher-parent coordination. If a student struggles, teachers provide individual support to strengthen concepts through worksheets and handouts." },
  { icon: BookOpenText, title: "Comprehensive Study Material", description: "Students receive a printed study kit covering all lessons. In case of absenteeism, photocopied notes are shared by the class teacher for easy catch-up." },
  { icon: LaptopMinimal, title: "Early Online Support (Nov & Dec 2025)", description: "Upon confirmation of admission, DPSIS offers complimentary online support classes in Nov & Dec to help students adjust before formal classes begin in January 2026." },
  { icon: BrainCircuit, title: "Skill Development, the DPSIS Way", description: "Our experienced teachers use differentiated instructional strategies to help students master essential Primary 2 skills. Regular assessments ensure consistent growth." },
  { icon: Landmark, title: "Flexible Fee Payment", description: "Only Primary 1 fees are applicable from Jan–March, pro-rated for three months, making it a cost-effective solution for parents." },
  { icon: Sparkles, title: "Expertly Curated Program", description: "Our 12+ years of experience in designing and delivering this program has earned consistent praise from parents for its thoughtful execution and results." },
];

const quickLinks = [
  { href: "https://dps.edu.sg/", label: "School Website", icon: School },
  { href: "https://dps.edu.sg/admission-fee-structure-and-payment-modes/", label: "School Fee Structure", icon: Banknote },
  { href: "https://dps.edu.sg/eca-cca/", label: "ECA and CCA Programs", icon: Palette },
  { href: "https://dps.edu.sg/book-a-tour-online-consultation/", label: "School Facilities Tour", icon: Building2 },
  { href: "https://dps.edu.sg/cambridge-curriculum/", label: "Cambridge Curriculum", icon: GraduationCap },
  { href: "https://dps.edu.sg/cisce-curriculum/", label: "ICSE Curriculum", icon: GraduationCap },
];


export default function HomePage() {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  return (
    <>
      {/* Hero Section with Contact Form */}
      <SectionWrapper className="bg-gradient-to-br from-primary/10 via-background to-background" id="home" ariaLabelledBy="hero-heading">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-6 text-center md:text-left py-4 md:py-8">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary tracking-tight">
              Join Bridge Program <span className="text-accent">January 2026</span> at DPSIS
            </h1>
            <p className="text-2xl sm:text-3xl font-headline text-foreground/90">
              A Confident Start Begins Here
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Join us at the DPSIS Open House and discover how our Bridge Program helps Kindergarten (K2) graduates transition smoothly to Primary 2 — all in just 3 months. Fill the form to inquire or register for the Open House.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:max-w-lg md:mx-auto">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>

      {/* Mobile Floating CTA */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Dialog open={isMobileFormOpen} onOpenChange={setIsMobileFormOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg rounded-full p-4 h-auto">
              <Send className="h-5 w-5 mr-2" /> Enquire Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90vw] w-[90vw] rounded-lg">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-primary text-2xl font-headline text-center">Enquire About Bridge Program</DialogTitle>
            </DialogHeader>
            <ContactForm isPopup={true} onSuccess={() => setIsMobileFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Open House Information Section */}
      <SectionWrapper id="open-house" ariaLabelledBy="open-house-heading" className="bg-background">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
            <Image
              src="/assets/img/1.jpg"
              alt="Teacher guiding young students"
              width={550}
              height={400}
              className="rounded-xl shadow-xl object-cover aspect-[11/8] w-full h-auto transition-transform duration-500 ease-in-out hover:scale-105"
              data-ai-hint="teacher students"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 id="open-house-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">What You’ll Learn at the Open House</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Discover how the DPSIS Bridge Program blends Cambridge’s inquiry-driven approach with expert guidance to ensure academic excellence, save an entire year, and support every learner’s journey forward. Our team will be available to answer all your questions.
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Program structure and curriculum details.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Meet our experienced educators.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Tour our state-of-the-art facilities.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Understand the admission process.</li>
            </ul>
             <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                <Link href="#home">Register for Open House</Link>
              </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* About the Bridge Program Section */}
      <SectionWrapper id="about" ariaLabelledBy="about-program-heading" className="bg-primary/5">
        <div className="text-center mb-12">
          <h2 id="about-program-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">About the Bridge Program</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Our Bridge Program is a specially designed academic track that helps K2 students complete a condensed Primary 1 curriculum from January to March 2026, preparing them to start Primary 2 in April 2026 with confidence.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
           <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">Built on a foundation of structured academics and inquiry-based learning, the program ensures:</p>
            <ul className="space-y-3">
              {[
                { icon: Target, text: "Strong grasp of foundational concepts" },
                { icon: Users, text: "Social-emotional readiness for Primary school" },
                { icon: HeartHandshake, text: "Personalized support and regular assessments" },
                { icon: Palette, text: "No compromise on co-curricular activities" },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg shadow-sm">
                  <item.icon className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              With over a decade of proven results, the program supports a seamless transition and helps your child stay on track with peers — without losing an academic year.
            </p>
          </div>
          <div>
            <Image
              src="/assets/img/2.jpg"
              alt="Teacher guiding young students"
              width={550}
              height={400}
              className="rounded-xl shadow-xl object-cover aspect-[11/8] w-full h-auto transition-transform duration-500 ease-in-out hover:scale-105"
              data-ai-hint="teacher students"
            />

          </div>
        </div>
      </SectionWrapper>

      {/* Why Parents Choose DPSIS Section */}
      <SectionWrapper id="why-choose" ariaLabelledBy="why-choose-heading" className="bg-background">
        <div className="text-center mb-12">
          <h2 id="why-choose-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">Why Parents Choose the DPSIS Bridge Program</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            A seamless transition from K2 to Primary 2, built on over 12 years of trust, care, and proven results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseItems.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} className="bg-card" />
          ))}
        </div>
      </SectionWrapper>

      {/* Quick Links Section */}
      <SectionWrapper id="quick-links" ariaLabelledBy="quick-links-heading" className="bg-muted">
        <div className="text-center mb-12">
          <h2 id="quick-links-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">Quick Links</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">Explore more about DPSIS and what we offer.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {quickLinks.map((link) => (
            <Button key={link.label} asChild variant="outline" className="flex flex-col items-center justify-center h-32 p-4 text-center bg-background hover:bg-primary/10 border-primary/30 text-primary shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon className="h-8 w-8 mb-2 text-accent group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{link.label}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground/50 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          ))}
        </div>
      </SectionWrapper>

      {/* Limited Seats Section */}
      <SectionWrapper id="offer" ariaLabelledBy="offer-heading" className="bg-accent/20 text-accent-foreground">
         <div className="text-center p-8 md:p-12 rounded-xl bg-accent text-background shadow-2xl">
          <Sparkles className="h-16 w-16 text-background mx-auto mb-4" />
          <h2 id="offer-heading" className="text-3xl md:text-4xl font-headline font-bold">Limited Seats. Special Offer.</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Seats are offered on a first-come, first-served basis. A limited-time waiver on the registration fee is currently available. Don't miss this opportunity!
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
            <Link href="#home">Secure Your Child's Spot Now <ChevronRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper id="faq" ariaLabelledBy="faq-heading" className="bg-background">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">Find answers to common questions about our Bridge Program.</p>
        </div>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="bg-card shadow-md rounded-lg border-none">
              <AccordionTrigger className="p-6 text-lg font-medium text-primary hover:no-underline hover:bg-primary/5 rounded-t-lg transition-colors">
                <div className="flex items-center gap-3">
                  <MessageCircleQuestion className="h-6 w-6 text-accent flex-shrink-0" />
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0 text-base text-foreground/80 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionWrapper>

      {/* Parent Testimonial Section */}
      <SectionWrapper id="testimonial" ariaLabelledBy="testimonial-heading" className="bg-primary/5">
        <div className="text-center mb-12">
          <h2 id="testimonial-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">Parent Testimonial</h2>
        </div>
        <Card className="max-w-3xl mx-auto shadow-xl bg-card rounded-xl overflow-hidden">
          <CardContent className="p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-accent/30 transform -translate-x-2 -translate-y-2" />
            <blockquote className="text-lg md:text-xl text-foreground/90 italic leading-relaxed z-10 relative">
              "We witnessed such a fast-paced, result-oriented and well-thought mental model through the DPS Bridge Course journey. During the course, we observed a considerable improvement in our child's ability to read, write, think, process, speak, and socialize. As a parent, we had many doubts initially about how our child would manage such an accelerated learning path. But the program engaged us from the start with constant feedback and communication, while involving our child in both academics and co-curricular activities."
            </blockquote>
            <footer className="mt-6 text-right">
              <p className="font-semibold text-primary text-lg">— Parent of a Bridge Program Student</p>
              <p className="text-sm text-muted-foreground">DPSIS Community</p>
            </footer>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  );
}


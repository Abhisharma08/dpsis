"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/SectionWrapper';
import ContactForm from '@/components/ContactForm';
import { FeatureCard } from '@/components/FeatureCard';
import {
  Users, School, Banknote, Building2, GraduationCap, ExternalLink, HeartHandshake, Target, Send, Globe, Activity, FileText, Palette, Quote, BookOpenCheck, FlaskConical, Atom, PencilRuler, Calculator, Laptop, Award, TrendingUp, Wallet
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const quickLinks = [
  { href: "#", label: "School Website", icon: Globe },
  { href: "#", label: "School Fee", icon: Banknote },
  { href: "#", label: "ECA and CCA", icon: Activity },
  { href: "#", label: "School facilities", icon: Building2 },
  { href: "#", label: "Cambridge Curriculum", icon: FileText },
  { href: "#", label: "ICSE Curriculum", icon: FileText },
];

const programFeatures = [
  {
    icon: HeartHandshake,
    title: "Strong Support System",
    description: "New joiners receive extra practice material and close teacher-parent coordination. If a student struggles, teachers provide individual support to strengthen concepts through worksheets and handouts."
  },
  {
    icon: BookOpenCheck,
    title: "Comprehensive Study Material",
    description: "Students receive a printed study kit covering all lessons. In case of absenteeism, photocopied notes are shared by the class teacher for easy catch-up."
  },
  {
    icon: Laptop,
    title: "Early Online Support (Nov & Dec 2025)",
    description: "Upon confirmation of admission, DPSIS offers complimentary online support classes in Nov & Dec to help students adjust before formal classes begin in January 2026."
  },
  {
    icon: TrendingUp,
    title: "Skill Development, the DPSIS Way",
    description: "Our experienced teachers use differentiated instructional strategies to help students master essential Primary 2 skills. Regular assessments ensure consistent growth."
  },
  {
    icon: Wallet,
    title: "Flexible Fee Payment",
    description: "Only Primary 1 fees are applicable from Jan–March, pro-rated for three months."
  },
  {
    icon: Award,
    title: "Expertly Curated Program",
    description: "Our 12+ years of experience in designing and delivering this program has earned consistent praise from parents for its thoughtful execution and results."
  }
];

const faqs = [
  {
    question: "Who is eligible for the DPSIS Bridge Program?",
    answer: "K2 graduates aged 5+ can join in January and transition to Primary 2 by April, after fulfilling outcomes.",
  },
  {
    question: "What is the purpose of the Bridge Program?",
    answer: "It helps K2 students catch up academically and transition smoothly into Primary 2 in just three months.",
  },
  {
    question: "How is the Bridge Program different from Primary 1?",
    answer: "Students follow a specially designed, focused curriculum that builds only the essential Primary 1 concepts needed for Primary 2.",
  },
  {
    question: "What kind of support will my child receive?",
    answer: "DPSIS offers extra academic help, differentiated instruction, and regular feedback to ensure your child progresses confidently.",
  },
  {
    question: "Can the Bridge Program help save an academic year?",
    answer: "Yes! It allows students to join Primary 2 in April, skipping a full year of Primary 1.",
  },
];

const testimonials = [
  {
    quote: "Our son Reyhaan attended the bridge course in 2019. To summarize the whole experience in two words, we would say \"Worth it\". We would be honest to tell you that it was not easy to squeeze in majority of an annual coursework in just 3 months! That's where the teachers did an amazing job of guiding and motivating the students. Reyhaan was so engaged that he wanted to continue with the same class teacher (Pousali ma'am) even in grade 2. Before joining the bridge course, Reyhaan was very keen on sitting for local school entrance exam in July as most of his kindergarten friends were there. But now he is just too happy and said he wants to continue here for as long as he can. We guess that it itself is a testimony of the trust and confidence that DPS instilled in him within just 3 months. Proud to be a part of the family.",
    author: "Sougata & Sreeparna",
  },
  {
    quote: "My daughter Ritvika Sriram joined DPSIS in the month of January 2019. Filled with curiosity and fear my girl attended the bridge course. The bridge course was properly planned and structured in a way the kids could have an easy transition to primary 2 in a short span of time. The three months of bridge course was stress free making the kids to comfortably adapt to the school environment. The teachers were very patient, dedicated and humble towards the children. The school management led by the efficient principal gave us a good support. Academically I could see a tremendous improvement in my child. DPS takes the responsibility on instilling good values in children. We as parents whole heartedly feel satisfied in selecting the right school for our child by selecting DPSIS.",
    author: "Preethishriram (Mother of Ritvika Sriram (2E))",
  },
  {
    quote: "We witnessed such a fast-paced, result-oriented and well-thought mental model through the DPS Bridge Course journey. During the course, we observed a considerable improvement in our child's ability to read, write, think, process, speak, and socialize. As a parent, we had many doubts initially about how our child would manage such an accelerated learning path. But the program engaged us from the start with constant feedback and communication, while involving our child in both academics and co-curricular activities.",
    author: "Parent of a Bridge Program Student",
  },
];

export default function HomePage() {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));

  return (
    <>
      {/* Hero Section with Contact Form */}
      <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/ddqqlfsjp/image/upload/v1750940236/WhatsApp_Image_2025-06-26_at_3.21.32_PM_vrzwky.jpg"
            alt="A vibrant classroom with children learning"
            fill
            priority
            className="h-full w-full object-cover"
            data-ai-hint="classroom children"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white tracking-tight [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]">
                Join <span className="text-primary">Bridge Program</span> in January 2026 at DPSIS
              </h1>
              <p className="text-2xl sm:text-3xl font-headline text-white/90 [text-shadow:1px_1px_6px_rgba(0,0,0,0.8)]">
                Nurturing Potential, Inspiring Confidence – Where Bright Futures Begin.
              </p>
              <p className="text-lg text-white/90 leading-relaxed max-w-xl [text-shadow:1px_1px_4px_rgba(0,0,0,0.8)]">
                Discover how the DPSIS Bridge Program empowers Kindergarten (K2) graduates to transition seamlessly into Primary 2 — in just 3 months.
              </p>
            </div>
            <div className="w-full md:max-w-lg md:mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

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

      {/* Highlights and Benefits Section */}
      <SectionWrapper id="highlights" ariaLabelledBy="highlights-heading" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-0">
          <GraduationCap className="w-64 h-64 text-primary/5 -rotate-12" />
        </div>
        <div aria-hidden="true" className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-0">
          <BookOpenCheck className="w-56 h-56 text-accent/5 rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="text-center mb-12">
              <h2 id="highlights-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">Why opt for it? <span className="text-accent">Highlights and benefits</span> of the Bridge Program to Primary 2</h2>
              <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Discover how the DPSIS Bridge Program blends Cambridge’s inquiry-driven approach with expert guidance to ensure academic excellence, save an entire year, and support every learner’s journey forward.
              </p>
          </div>
          <div className="flex justify-center">
              <Image
                  src="https://res.cloudinary.com/ddqqlfsjp/image/upload/v1750944922/1-01_wjohsz.png"
                  alt="Diagram showing the Bridge Program flow from Kindergarten to Primary 2"
                  width={800}
                  height={450}
                  className="rounded-xl shadow-xl border object-contain w-full max-w-4xl h-auto"
              />
          </div>
        </div>
      </SectionWrapper>

      {/* About the Bridge Program Section */}
      <SectionWrapper id="about" ariaLabelledBy="about-program-heading">
        <div className="grid md:grid-cols-2 gap-12 items-start">
           <div className="space-y-4">
            <h2 id="about-program-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">About the <span className="text-accent">Bridge Program:</span></h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Bridge Program is a specially designed academic track that helps K2 students complete a condensed Primary 1 curriculum from January to March 2026, preparing them to start Primary 2 in April 2026 with confidence.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Built on a foundation of structured academics and inquiry-based learning, the program ensures:
            </p>
            <ul className="space-y-3 pt-2">
              {[
                { icon: Target, text: "Strong grasp of foundational concepts" },
                { icon: Users, text: "Social-emotional readiness for Primary school" },
                { icon: HeartHandshake, text: "Personalized support and regular assessments" },
                { icon: Palette, text: "No compromise on co-curricular activities" },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-background/50 backdrop-blur-md border border-primary/10 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <item.icon className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground/80 leading-relaxed pt-2">
              With over a decade of proven results, the program supports a seamless transition and helps your child stay on track with peers — without losing an academic year.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/550x400.png"
              alt="Teacher guiding young students"
              width={550}
              height={400}
              className="rounded-xl shadow-xl object-cover aspect-[11/8] w-full h-auto transition-transform duration-500 ease-in-out hover:scale-105"
              data-ai-hint="teacher students"
            />
          </div>
        </div>
      </SectionWrapper>
      
      {/* Why Parents Choose Section */}
      <SectionWrapper id="why-choose-us" ariaLabelledBy="why-choose-us-heading" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-0">
          <FlaskConical className="w-64 h-64 text-primary/5 rotate-12" />
        </div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 z-0">
          <Atom className="w-56 h-56 text-accent/5 -rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 id="why-choose-us-heading" className="text-3xl md:text-4xl font-headline font-semibold"><span className="text-primary">Why Parents Choose the</span> <span className="text-accent">DPSIS Bridge Program</span></h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              A seamless transition from K2 to Primary 2, built on over 12 years of trust, care, and proven results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
      
      {/* Parent Testimonial Section */}
      <SectionWrapper id="testimonial" ariaLabelledBy="testimonial-heading">
        <div className="text-center mb-12">
          <h2 id="testimonial-heading" className="text-3xl md:text-4xl font-headline font-semibold"><span className="text-primary">Parent</span> <span className="text-accent">Testimonials</span></h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">Parents share their heartfelt experiences with the DPSIS Bridge Program.</p>
        </div>
        <Carousel
          plugins={[autoplayPlugin.current]}
          opts={{
            align: "start",
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2 p-4">
                  <Card className="h-full p-8 shadow-lg bg-background/50 backdrop-blur-md border flex flex-col border-primary/10">
                    <CardContent className="p-0 text-left flex-grow">
                      <Quote className="h-10 w-10 text-primary/50 mb-4 transform -scale-x-100" />
                      <blockquote className="text-base italic text-foreground/90 leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                    </CardContent>
                    <p className="text-right mt-6 font-semibold text-primary">— {testimonial.author}</p>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </SectionWrapper>
      
      {/* FAQ Section */}
      <SectionWrapper id="faq" ariaLabelledBy="faq-heading" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-0">
            <PencilRuler className="w-56 h-56 text-primary/5 -rotate-12" />
        </div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 z-0">
            <Calculator className="w-48 h-48 text-accent/5 rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-headline font-semibold"><span className="text-primary">Frequently Asked</span> <span className="text-accent">Questions</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-primary/20 bg-background/50 backdrop-blur-md rounded-lg mb-2 px-4 shadow-sm">
                <AccordionTrigger className="text-lg hover:no-underline text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80 pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>

      {/* Limited Seats Section */}
      <SectionWrapper id="offer" ariaLabelledBy="offer-heading" className="bg-gradient-to-tr from-accent/20 to-accent/5 py-12 md:py-16">
        <div className="text-center">
          <h2 id="offer-heading" className="text-3xl font-headline font-bold text-primary">Limited Seats. <span className="text-accent">Special Offer.</span></h2>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
            Seats are offered on a first-come, first-served basis. A limited-time waiver on the registration fee is currently available.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#home">Enquire Now</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* Our Campuses Section */}
      <SectionWrapper id="campuses" ariaLabelledBy="campuses-heading">
        <div className="text-center mb-12">
          <h2 id="campuses-heading" className="text-3xl md:text-4xl font-headline font-semibold"><span className="text-primary">Our</span> <span className="text-accent">Campuses</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <Image
              src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/3ropxvtg/ik6/71a/unj/dpsis-kovan-campus-1.jpg"
              alt="Kovan Campus (Main Campus)"
              width={500}
              height={330}
              className="rounded-lg shadow-lg mb-4 object-cover w-full transition-transform duration-300 hover:scale-105"
              data-ai-hint="school building grass"
            />
            <h3 className="text-xl font-semibold text-foreground">Kovan Campus (Main Campus)</h3>
            <p className="text-muted-foreground mt-1">36, Aroozoo Avenue<br/>Singapore 539842</p>
          </div>
          <div className="text-center">
             <Image
              src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/3ropxvtg/pol/p5z/c87/DPSIS-Alexandra-Campus-Building.jpg"
              alt="Alexandra Campus"
              width={500}
              height={330}
              className="rounded-lg shadow-lg mb-4 object-cover w-full transition-transform duration-300 hover:scale-105"
              data-ai-hint="modern office building"
            />
            <h3 className="text-xl font-semibold text-foreground">Alexandra Campus</h3>
            <p className="text-muted-foreground mt-1">456 Alexandra Road, Level 11<br/>Singapore 119962</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="#home">Enquire Now</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Quick Links Section */}
      <SectionWrapper id="quick-links" ariaLabelledBy="quick-links-heading">
        <div className="text-center mb-12">
          <h2 id="quick-links-heading" className="text-3xl md:text-4xl font-headline font-semibold text-primary">Quick <span className="text-accent">Links</span></h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">Explore more about DPSIS and what we offer.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {quickLinks.map((link) => (
            <Button key={link.label} asChild variant="outline" className="flex flex-col items-center justify-center h-32 p-4 text-center bg-card border shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out group hover:bg-accent hover:text-accent-foreground">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon className="h-8 w-8 mb-2 text-primary transition-colors group-hover:text-accent-foreground" />
                <span className="text-sm font-medium transition-colors">{link.label}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground/50 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

    
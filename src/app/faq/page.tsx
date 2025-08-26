import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is eligible to participate?",
    answer: "Scriptember is open to everyone, regardless of age, skill level, or location. Whether you're a student, a professional developer, or just curious about coding, you're welcome to join.",
  },
  {
    question: "Are there any rules for project submissions?",
    answer: "Yes. All code must be written during the hackathon period. You must submit your project to the official portal before the deadline. Projects must be open-source and use a permissive license (e.g., MIT, Apache 2.0). Teams can have up to 4 members.",
  },
  {
    question: "How does judging work?",
    answer: "A panel of expert judges will score projects based on several criteria: Code Quality (30%), Impact (30%), Originality (20%), and Presentation (20%). All scores are normalized to a 100-point scale. The judging process is blind to ensure fairness.",
  },
  {
    question: "What are the prizes?",
    answer: "We have a wide range of prizes including cash, software licenses, hardware, and exclusive swag from our sponsors. Prizes will be awarded to the top overall projects as well as winners of specific challenges.",
  },
  {
    question: "How can I contact the organizers?",
    answer: "The best way to reach us is through the #help channel on our official Discord server. You can also email us at scriptember@example.com for specific inquiries.",
  },
  {
      question: "Can I work on an existing project?",
      answer: "You can work on an existing project as long as the new code and features are developed during the hackathon timeline. You must clearly state what was pre-existing in your submission's README file."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Have questions? We have answers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg hover:text-primary">
                        {faq.question}
                    </A>
                    <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAQ_DATA = {
  RIDER: [
    {
      q: "How do I book a ride?",
      a: "You can easily book a ride through our mobile app. Enter your pickup and drop-off locations, choose your vehicle type, and confirm the fare. No account is needed to see fare estimates!",
    },
    {
      q: "Can I cancel my ride?",
      a: "Yes, you can cancel a ride at any time before the driver arrives. A small cancellation fee may apply if you cancel after a few minutes of the driver accepting the trip.",
    },
    {
      q: "How is the fare calculated?",
      a: "Fares are calculated based on distance, estimated trip time, and current demand (dynamic pricing). You will always see the final price before confirming the booking.",
    },
  ],
  DRIVER: [
    {
      q: "What are the requirements to become a driver?",
      a: "You need to be over 21, possess a valid driver's license, have a clean driving record, and own a 4-door vehicle that meets our model year requirements (usually 2010 or newer).",
    },
    {
      q: "How and when do I get paid?",
      a: "Drivers are paid weekly via direct deposit. We also offer an instant payout option for a small transaction fee if you need access to your earnings immediately.",
    },
    {
      q: "Do I have to accept all ride requests?",
      a: "No, you have the flexibility to accept or decline ride requests based on your preference and schedule. However, maintaining a high acceptance rate can lead to better bonuses.",
    },
  ],
  GENERAL: [
    {
      q: "Is the app available on iOS and Android?",
      a: "Yes, our app is available for free download on both the Apple App Store and Google Play Store.",
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach our 24/7 customer support team directly through the 'Help' section within the app, or by emailing support@ridemgmt.com.",
    },
  ],
};

const Faq = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="container">
        {/* Header Section */}
        <section className="py-12 md:py-20 bg-background border-b border-border/50">
          <div className="  text-center  ">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-4">
              Questions? We've Got Answers.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Find quick solutions to common inquiries about booking, safety,
              driving, and more.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-20 md:py-32 bg-secondary/10 dark:bg-secondary/20">
          {/* Rider FAQs */}
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-8">
            <span className="text-primary">Rider</span> Questions
          </h2>
          <Accordion type="single" collapsible className="w-full mb-16">
            {FAQ_DATA.RIDER.map((item, index) => (
              <AccordionItem key={index} value={`rider-${index}`}>
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Driver FAQs */}
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-8">
            <span className="text-primary">Driver</span> Questions
          </h2>
          <Accordion type="single" collapsible className="w-full mb-16">
            {FAQ_DATA.DRIVER.map((item, index) => (
              <AccordionItem key={index} value={`driver-${index}`}>
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* General FAQs */}
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-8">
            General Inquiries
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_DATA.GENERAL.map((item, index) => (
              <AccordionItem key={index} value={`general-${index}`}>
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Support Card Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className=" text-center ">
            <Card className="p-8 md:p-12 shadow-xl bg-card">
              <h3 className="text-2xl font-bold mb-4">
                Still Can't Find Your Answer?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our dedicated support team is available 24/7 to help you with
                any specific questions or concerns.
              </p>
              <Button size="lg" className="shadow-lg">
                Contact Customer Support
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;

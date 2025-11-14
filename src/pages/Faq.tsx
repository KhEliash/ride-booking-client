/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const FAQ_DATA = {
  RIDER: [
    {
      q: "How do I book a ride?",
      a: "Open the app, enter your pickup and drop-off locations, choose a ride option, and confirm. A nearby driver will be assigned automatically."
    },
    {
      q: "What payment methods are supported?",
      a: "You can pay using cash, mobile banking services (Nagad, bKash), or saved debit/credit cards depending on availability in your city."
    },
    {
      q: "Can I cancel a ride after booking?",
      a: "Yes. You can cancel before the driver reaches your pickup point. However, a small cancellation fee may apply if the driver has already waited or traveled towards your location."
    },
    {
      q: "How is the fare calculated?",
      a: "Fare is based on base fare, total distance, estimated trip duration, and real-time traffic/demand. The final price is shown before confirming the ride."
    },
    {
      q: "Is my real phone number shared with the driver?",
      a: "No. We use a masked phone number system for privacy. Both riders and drivers communicate through a protected proxy number."
    }
  ],

  DRIVER: [
    {
      q: "What documents do I need to sign up as a driver?",
      a: "You’ll need a valid driving license, NID, profile photo, vehicle registration papers, and a smartphone with stable internet connection."
    },
    {
      q: "When do drivers receive payments?",
      a: "Earnings are transferred weekly to your designated bank or mobile banking account. You can also use Instant Cashout when available."
    },
    {
      q: "How does driver rating work?",
      a: "After each trip, riders can rate their driver. Maintaining a strong rating improves your priority for receiving high-value rides."
    },
    {
      q: "Do I have to accept every ride request?",
      a: "No, but frequently canceling or ignoring requests may affect your acceptance rate, which can limit access to bonuses and incentives."
    },
    {
      q: "Can I go offline anytime?",
      a: "Yes. Drivers can switch from Online to Offline whenever they want—perfect for flexible working hours."
    }
  ],

  GENERAL: [
    {
      q: "Is the app available on iOS and Android?",
      a: "Yes. The app is available for free on both the App Store and Google Play Store."
    },
    {
      q: "How do I contact customer support?",
      a: "Go to the 'Help & Support' section inside the app. You can chat with support, submit a ticket, or request a callback 24/7."
    },
    {
      q: "Is my personal data secure?",
      a: "Absolutely. We use end-to-end encryption, secure payment gateways, and never share personal data with third parties without consent."
    },
    {
      q: "Do you offer promo codes or discounts?",
      a: "Yes. Promo codes are available during special events and can be applied during checkout before confirming your ride."
    },
    {
      q: "How do I report an issue with a trip?",
      a: "Open the trip history, select the specific ride, and choose 'Report an Issue'. Our support team will respond within minutes."
    }
  ]
};

 
const filterFAQs = (faqs: any[], search: string) => {
  if (!search.trim()) return faqs;
  return faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );
};

const Faq = () => {
  const [search, setSearch] = useState("");

  const filteredRider = filterFAQs(FAQ_DATA.RIDER, search);
  const filteredDriver = filterFAQs(FAQ_DATA.DRIVER, search);
  const filteredGeneral = filterFAQs(FAQ_DATA.GENERAL, search);

  const hasResults =
    filteredRider.length + filteredDriver.length + filteredGeneral.length > 0;

  return (
    <div className="flex items-center justify-center">
      <div className="container">

        {/* Header */}
        <section className="py-12 md:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Questions? We've Got Answers.
          </h1>
          <p className="text-lg text-muted-foreground">
            Find quick solutions about booking, safety, and more.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-10">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="h-12 text-base"
            />
          </div>
        </section>

        <section className="py-16 md:py-24">
          {!hasResults && (
            <p className="text-center text-muted-foreground text-lg mb-10">
              No matching questions found.
            </p>
          )}

          {/* Rider */}
          {filteredRider.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold mb-8 border-b pb-2">
                <span className="text-primary">Rider</span> Questions
              </h2>

              <Accordion type="single" collapsible className="mb-16">
                {filteredRider.map((item, index) => (
                  <AccordionItem key={index} value={`r-${index}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}

          {/* Driver */}
          {filteredDriver.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold mb-8 border-b pb-2">
                <span className="text-primary">Driver</span> Questions
              </h2>

              <Accordion type="single" collapsible className="mb-16">
                {filteredDriver.map((item, index) => (
                  <AccordionItem key={index} value={`d-${index}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}

          {/* General */}
          {filteredGeneral.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold mb-8 border-b pb-2">
                General Inquiries
              </h2>

              <Accordion type="single" collapsible>
                {filteredGeneral.map((item, index) => (
                  <AccordionItem key={index} value={`g-${index}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </section>

        {/* Support Card */}
        <section className="py-16 md:py-20">
          <Card className="p-10 text-center shadow-md">
            <h3 className="text-2xl font-bold mb-4">
              Still Can't Find Your Answer?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to help you.
            </p>
            <Link to="/contact">
              <Button size="lg" className="cursor-pointer">Contact Support</Button>
            </Link>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default Faq;


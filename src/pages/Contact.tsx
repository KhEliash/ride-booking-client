import React from "react";
// Assuming shadcn/ui components are correctly imported from your setup
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react"; // Example icons

const ContactPage: React.FC = () => {
  return (
    // Single wrapper div for the entire page content
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="container">      {/* Section 1: Hero Header */}
      <section className="py-16 md:py-24 bg-secondary/10 dark:bg-secondary/20 border-b border-border/50">
        <div className=" text-center ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're here to help. Reach out to our support team, press office, or
            corporate headquarters.
          </p>
        </div>
      </section>

      {/* Section 2: Contact Details and Form (Grid Layout) */}
      <section className="py-20 md:py-32">
        <div className="  grid lg:grid-cols-3 gap-12  ">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Primary Contact Card */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-primary" />
                General Support
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  **Phone:** (555) 123-4567
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  **Email:** support@ridemgmt.com
                </p>
                <p className="text-sm pt-2">
                  Available 24 hours a day for rider and driver assistance.
                </p>
              </div>
            </Card>

            {/* Secondary Contact Card */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-primary" />
                Corporate Office
              </h2>
              <p className="text-muted-foreground">
                123 Mobility Drive, Suite 400
                <br />
                Metropolis, CA 90210
                <br />
                USA
              </p>
              <Button variant="link" className="p-0 mt-4 text-primary">
                Get Directions
              </Button>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <Card className="p-8 md:p-10 lg:col-span-2 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Your Full Name" required />
                <Input type="email" placeholder="Your Email Address" required />
              </div>
              <Input
                type="text"
                placeholder="Subject (e.g., Driver Application Inquiry)"
                required
              />
              <Textarea
                rows={6}
                placeholder="How can we help you today?"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto shadow-lg"
              >
                Submit Inquiry
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Section 3: Map Embed Placeholder (Full Width) */}
      <section className="pt-0 pb-10 md:pb-32">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-6 text-center">
          Find Our Headquarters
        </h2>
        {/* This is a placeholder for a Google Maps or similar embed */}
        <div className="w-full h-96 bg-muted rounded-xl border border-border flex items-center justify-center text-muted-foreground">
          [Map Embed Placeholder: Google Maps API or Iframe]
        </div>
      </section>
      </div>

    </div>
  );
};

export default ContactPage;

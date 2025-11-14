/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    setIsSubmitting(true);

    setTimeout(() => {
      reset();
      setIsSubmitting(false);
      toast.success("Message sent");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="container">
        <section className="py-16 md:py-24 bg-secondary/10 dark:bg-secondary/20 border-b border-border/50">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're here to help. Reach out to our support team, press office,
              or corporate headquarters.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
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
              </Card>
            </div>

            <Card className="p-8 md:p-10 lg:col-span-2 shadow-md">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Full Name"
                    {...register("fullName")}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email Address"
                    {...register("email")}
                    required
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Subject (e.g., Driver Application Inquiry)"
                  {...register("subject")}
                  required
                />

                <Textarea
                  rows={6}
                  placeholder="How can we help you today?"
                  {...register("message")}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto shadow-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </span>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;

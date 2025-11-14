import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <>
      <div className=" flex justify-center">
        <div className="container">
          <section className="py-16 md:py-24 bg-background">
            <div className="  text-center ">
              <Badge variant="outline" className="text-sm px-3 py-1 mb-4">
                Our Story
              </Badge>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground mb-4">
                Driving the Future of Urban Mobility
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Founded on the principle of reliable, safe, and accessible
                transportation, our Ride Management System is reshaping how
                cities move.
              </p>
            </div>
          </section>

          <section className="py-20 md:py-32 ">
            <div className="  grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column: Background & History */}
              <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                  Our Background: Building Trust, Mile by Mile
                </h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                  We launched in 20XX after noticing a gap in the market for a
                  truly integrated, user-centric ride service. Our goal wasn't
                  just to connect riders and drivers, but to create a
                  sustainable ecosystem built on **transparency and safety**. We
                  started with a small fleet and have since grown into a robust,
                  scalable platform supporting thousands of daily trips.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground">
                  Our technology is proprietary, leveraging real-time data and
                  AI to optimize routes, ensuring the fastest, most efficient
                  service for riders and maximum earnings for our drivers.
                </p>
              </div>

              {/* Right Column: Mission and Core Values */}
              <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                  Our Mission & Values
                </h2>

                <div className="space-y-6 mt-6">
                  <Card data-aos="fade-up" className="p-4 border-l-4 border-primary">
                    <h3 className="text-xl font-bold flex items-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-3 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a10 10 0 0 0-4.04 19.19l-1.39-1.39" />
                        <path d="M12 2a10 10 0 0 1 4.04 19.19l1.39-1.39" />
                      </svg>
                      Safety First
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Implementing the latest safety features, including the SOS
                      button and verified profiles, is non-negotiable.
                    </p>
                  </Card>
                  <Card data-aos="fade-up" className="p-4 border-l-4 border-green-500">
                    <h3 className="text-xl font-bold flex items-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-3 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                        <line x1="4" x2="4" y1="22" y2="15" />
                      </svg>
                      Accessibility
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ensuring our service is easily available and affordably
                      priced for everyone in the communities we serve.
                    </p>
                  </Card>
                  <Card data-aos="fade-up" className="p-4 border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold flex items-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-3 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a10 10 0 0 0-4.04 19.19l-1.39-1.39" />
                      </svg>
                      Driver Empowerment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Providing flexible earning models and comprehensive
                      support to empower our driver partners.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 bg-background">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-center mb-12">
              Meet the Driving Force
            </h2>

            {/* Team Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2  shadow-lg">
                  <AvatarImage src="/team/founder.jpg" alt="CEO Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Jane Doe</h3>
                <p className="text-sm text-primary">Chief Executive Officer</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Visionary behind the platform, focusing on market expansion.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-border shadow-lg">
                  <AvatarImage src="/team/cto.jpg" alt="CTO Avatar" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Alex Smith</h3>
                <p className="text-sm text-muted-foreground">
                  Chief Technology Officer
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Leads the engineering team, ensuring robust API and app
                  performance.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-border shadow-lg">
                  <AvatarImage src="/team/ops.jpg" alt="Head of Ops Avatar" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Maria Rodriguez</h3>
                <p className="text-sm text-muted-foreground">
                  Head of Operations
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Manages driver onboarding, compliance, and user safety
                  standards.
                </p>
              </div>

              {/* Team Member 4 */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-border shadow-lg">
                  <AvatarImage
                    src="/team/marketing.jpg"
                    alt="Marketing Lead Avatar"
                  />
                  <AvatarFallback>TL</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Tom Lee</h3>
                <p className="text-sm text-muted-foreground">
                  Marketing Director
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Focuses on rider acquisition and brand communication
                  strategies.
                </p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-foreground mb-4">
                Have questions about our team or company?
              </p>
              <Link to={"/contact"}>
                <Button size="lg" className="shadow-lg cursor-pointer">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;

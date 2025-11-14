import image1 from "@/assets/images/whyChooseUs.png";
import image2 from "@/assets/images/whyChoose-us-2.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const WhyChooseUs = () => {
    useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <section className="container py-20">
      <h2 className="pb-8 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-12">
        Why Choose Our Ride Service?
      </h2>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Feature 1: For Riders */}
        <div data-aos="fade-up" className="flex flex-col gap-4 text-center lg:text-left">
          <h3 className="text-2xl font-bold">Safe & Reliable Journeys</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our platform prioritizes your safety with verified drivers,
            real-time tracking, and 24/7 support. Travel with peace of mind,
            knowing you're in good hands.
          </p>
          <ul className="list-disc list-inside text-left text-muted-foreground mt-2 space-y-1">
            <li>Driver background checks</li>
            <li>In-app emergency button</li>
            <li>Share ride details with loved ones</li>
          </ul>
        </div>
        <div data-aos="fade-up" className="flex justify-center">
          <img
            src={image1}
            alt="Safety and Reliability"
            className="object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Feature 2: For Drivers (reverse layout) */}
        <div className="flex justify-center order-last lg:order-first">
          <img
            src={image2}
            alt="Flexible Earnings"
            className="max-w-full h-auto object-contain lg:max-w-md rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-4 text-center lg:text-left order-first lg:order-last">
          <h3 className="text-2xl font-bold">Flexible Earnings & Support</h3>
          <p className="text-muted-foreground leading-relaxed">
            Become a driver and earn on your schedule. Our platform offers
            competitive rates, easy-to-use tools, and a supportive community to
            help you succeed.
          </p>
          <ul className="list-disc list-inside text-left text-muted-foreground mt-2 space-y-1">
            <li>Set your own hours</li>
            <li>Instant payout options</li>
            <li>Dedicated driver support</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

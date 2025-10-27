import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Assumed Button component
import { Card } from "@/components/ui/card"; // Assumed Card component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Map,
  DollarSign,
  CarFront,
  Shield,
  Settings,
  type LucideIcon,
} from "lucide-react";

// --- 1. Data Structures ---

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const RIDER_FEATURES: Feature[] = [
  {
    icon: Map,
    title: "Real-Time Tracking",
    description:
      "Follow your driver's exact location and arrival time on an interactive map.",
  },
  {
    icon: CheckCircle,
    title: "Instant Booking",
    description:
      "Secure a ride in less than 30 seconds with our streamlined request process.",
  },
  {
    icon: Shield,
    title: "In-App Safety",
    description:
      "Access SOS features, share trip status, and view driver ratings instantly.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "See the exact fare estimate before you book, with no hidden fees.",
  },
];

const DRIVER_FEATURES: Feature[] = [
  {
    icon: DollarSign,
    title: "Flexible Payouts",
    description:
      "Receive your earnings instantly or on a weekly schedule, managed through the app.",
  },
  {
    icon: Settings,
    title: "Set Your Hours",
    description:
      "Drive when and where you want. Our system adapts to your personal schedule.",
  },
  {
    icon: CarFront,
    title: "Optimized Routing",
    description:
      "AI-driven routes minimize dead time and maximize efficiency for better income.",
  },
  {
    icon: Shield,
    title: "Driver Support",
    description:
      "24/7 dedicated support for any on-road issue or technical query.",
  },
];

// --- 2. Feature Card Component ---

// Note: This assumes a Card component exists (e.g., from shadcn/ui)
const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => (
  <Card className="p-6 transition-all duration-300 hover:shadow-2xl hover:border-primary border-2 border-transparent">
    <Icon className="w-8 h-8 text-primary mb-4 animate-pulse" />{" "}
    {/* Added animation */}
    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </Card>
);

// --- 3. Main Component (Features) ---

const Features: React.FC = () => {
  return (
    <div className="space-y-24 flex items-center justify-center">
      <div className="space-y-24 container ">
        {/* 🚀 Hero Section (Re-styled for a features intro) 🚀 */}
        <section className="py-16 md:py-24 bg-background">
          <div className="  text-center  ">
            <Badge
              variant="default"
              className="text-sm px-3 py-1 mb-4 shadow-md bg-primary hover:bg-primary/90"
            >
              ✨ Core Features
            </Badge>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground mb-4">
              Powerful Features for Every Journey
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              From seamless booking to flexible earning, discover how our
              platform is built for speed, safety, and **unmatched
              reliability**.
            </p>
          </div>
        </section>

        {/* --- ⚙️ Tabs Section for Rider/Driver Features ⚙️ */}
        <section className="py-10 md:py-20 bg-secondary/50 dark:bg-secondary/30">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
            Features Tailored to Your Role
          </h2>

          <Tabs defaultValue="riders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto mb-12 h-12 p-1 bg-background shadow-lg rounded-full">
              {" "}
              {/* Enhanced TabsList styling */}
              <TabsTrigger
                value="riders"
                className="text-lg rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                For Riders
              </TabsTrigger>
              <TabsTrigger
                value="drivers"
                className="text-lg rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                For Drivers
              </TabsTrigger>
            </TabsList>

            {/* Content for Riders */}
            <TabsContent value="riders">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {RIDER_FEATURES.map((feature, index) => (
                  <FeatureCard key={`rider-${index}`} {...feature} />
                ))}
              </div>
            </TabsContent>

            {/* Content for Drivers */}
            <TabsContent value="drivers">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {DRIVER_FEATURES.map((feature, index) => (
                  <FeatureCard key={`driver-${index}`} {...feature} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* --- 🛡️ Technology & Security Section 🛡️ */}
        <section className="py-20 md:py-32 bg-background">
          <div className="  grid lg:grid-cols-2 gap-16 items-center">
            {/* Right: Text Content */}
            <div className="order-first lg:order-first">
              {" "}
              {/* Swapped content order for better flow on desktop */}
              <Badge
                variant="secondary"
                className="px-3 py-1 mb-4 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                Security & Innovation
              </Badge>
              <h2 className="scroll-m-20 text-3xl font-bold tracking-tight mb-4 lg:text-4xl">
                Powered by Cutting-Edge Technology
              </h2>
              <p className="leading-7 text-muted-foreground mb-8">
                {" "}
                {/* Increased bottom margin for spacing */}
                Our proprietary algorithm goes beyond simple GPS. We use
                **machine learning** to predict traffic patterns, optimize
                driver-rider matches, and constantly enhance our security
                protocols. This means faster pickups and safer journeys, every
                time.
              </p>
              {/* Detailed list with enhanced checkmarks */}
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />{" "}
                  {/* Highlighted checkmark */}
                  <div>
                    **Machine Learning Dispatch**: Smarter matching for reduced
                    wait times.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                  <div>
                    **End-to-End Encryption**: Protecting your personal and
                    payment data.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                  <div>
                    **Driver Telematics**: Monitoring vehicle health and driving
                    behavior for safety.
                  </div>
                </li>
              </ul>
            </div>

            {/* Left: Illustration / Image */}
            <div className="flex justify-center order-last lg:order-last">
              {/* Note: In a real app, ensure /path/to/safety-tech.svg exists */}
              <img
                src="https://picsum.photos/600/300"
                alt="Advanced Safety and Tech"
                className="w-full max-w-lg h-auto object-contain rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]" /* Enhanced shadow */
              />
            </div>
          </div>
        </section>

        {/* --- CTA Section (Call to Action) --- */}
        <section className="py-20 bg-secondary text-secondary-foreground text-center">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-95 font-light">
            Seamless rides, flexible earnings. Download the app today and join
            our community!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Primary button for Riders (now styled for secondary background) */}
            <Button
              variant="default"
              size="lg"
              className="px-10 py-3 rounded-full text-secondary font-semibold shadow-2xl hover:scale-[1.03] transition-transform duration-300"
            >
              Book Your First Ride ➡️
            </Button>

            {/* Secondary button for Drivers */}
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-3 rounded-full border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground/20 hover:text-white transition-all duration-300 font-semibold"
            >
              Join Our Driver Network
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Features;

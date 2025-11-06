import { Card } from "@/components/ui/card";
import { LocationEdit, Map, ThumbsUp, UserCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="container py-20 text-center">
      <h2 className="pb-8 text-3xl font-semibold tracking-tight first:mt-0 mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
            <LocationEdit className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">1. Request Your Ride</h3>
          <p className="text-muted-foreground">
            Easily set your pickup and destination points through our app.
          </p>
        </Card>
        {/* Step 2 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-4">
            <UserCheck className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">2. Get Matched</h3>
          <p className="text-muted-foreground">
            We'll find the nearest available and reliable driver for you
            instantly.
          </p>
        </Card>
        {/* Step 3 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mb-4">
            <Map className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">3. Track Your Driver</h3>
          <p className="text-muted-foreground">
            Watch your driver's arrival in real-time on our interactive map.
          </p>
        </Card>
        {/* Step 4 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 mb-4">
            <ThumbsUp className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">4. Arrive Safely</h3>
          <p className="text-muted-foreground">
            Reach your destination comfortably and securely, every single time.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;

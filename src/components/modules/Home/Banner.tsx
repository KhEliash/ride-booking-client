import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <>
    <section className="relative container overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      

      {/* Main content */}
      <div className="relative z-10 mx-auto flex  flex-col items-center justify-between px-6 py-20 md:flex-row md:py-28 lg:px-12">
        {/* Left Side — Texts */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-6xl">
            <span className="block">Your Ride,</span>
            <span className="text-primary block">Your Way.</span>
          </h1>

          <p className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-300">
            Book rides instantly, track your driver in real-time, and travel
            with comfort — all from one simple app.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button size="lg" className="flex items-center gap-2">
              Book a Ride <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Side — Rider Image */}
        <div className="mt-12 flex-1 md:mt-0 md:ml-12">
          <img
            src="https://img.freepik.com/premium-vector/car-illustration-illustrator_1148900-644.jpg?w=2000"
            alt="Rider on scooter"
            className="mx-auto w-full max-w-md rounded-xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>

{/* // how it works  */}

{/* // Example structure */}
<section className="container py-20 text-center">
    <h2 className="pb-8 text-3xl font-semibold tracking-tight first:mt-0 mb-12">How It Works</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Step 1 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                {/* <CarFront className="h-8 w-8" /> */} {/* Replace with actual icon component */}
                <svg xmlns="https://img.freepik.com/premium-vector/car-illustration-illustrator_1148900-644.jpg?w=2000" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin"><path d="M12 17.75S4 10.25 4 7.75A8 8 0 0 1 12 0a8 8 0 0 1 8 7.75c0 2.5-8 10-8 10z"></path><circle cx="12" cy="7.75" r="3"></circle></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Request Your Ride</h3>
            <p className="text-muted-foreground">Easily set your pickup and destination points through our app.</p>
        </Card>
        {/* Step 2 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-4">
                {/* <UserCheck className="h-8 w-8" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-car"><path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z"></path><circle cx="7" cy="13" r="2"></circle><circle cx="17" cy="13" r="2"></circle><path d="M5 15h14"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Get Matched</h3>
            <p className="text-muted-foreground">We'll find the nearest available and reliable driver for you instantly.</p>
        </Card>
        {/* Step 3 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mb-4">
                {/* <Map className="h-8 w-8" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Track Your Driver</h3>
            <p className="text-muted-foreground">Watch your driver's arrival in real-time on our interactive map.</p>
        </Card>
        {/* Step 4 */}
        <Card className="flex flex-col items-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 mb-4">
                {/* <ThumbsUp className="h-8 w-8" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Arrive Safely</h3>
            <p className="text-muted-foreground">Reach your destination comfortably and securely, every single time.</p>
        </Card>
    </div>
</section>

{/* // Why Choose Our Ride Service?*/}

<section className="container py-20">
    <h2 className="pb-8 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-12">Why Choose Our Ride Service?</h2>
    <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Feature 1: For Riders */}
        <div className="flex flex-col gap-4 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Safe & Reliable Journeys</h3>
            <p className="text-muted-foreground leading-relaxed">
                Our platform prioritizes your safety with verified drivers, real-time tracking, and 24/7 support.
                Travel with peace of mind, knowing you're in good hands.
            </p>
            <ul className="list-disc list-inside text-left text-muted-foreground mt-2 space-y-1">
                <li>Driver background checks</li>
                <li>In-app emergency button</li>
                <li>Share ride details with loved ones</li>
            </ul>
        </div>
        <div className="flex justify-center">
            {/* Replace with your actual image path */}
            <img src="https://img.freepik.com/premium-vector/car-illustration-illustrator_1148900-644.jpg?w=2000" alt="Safety and Reliability" className="max-w-full h-auto object-contain lg:max-w-md rounded-lg shadow-lg" />
        </div>

        {/* Feature 2: For Drivers (reverse layout) */}
        <div className="flex justify-center order-last lg:order-first">
            {/* Replace with your actual image path */}
            <img src="https://img.freepik.com/premium-vector/car-illustration-illustrator_1148900-644.jpg?w=2000" alt="Flexible Earnings" className="max-w-full h-auto object-contain lg:max-w-md rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col gap-4 text-center lg:text-left order-first lg:order-last">
            <h3 className="text-2xl font-bold">Flexible Earnings & Support</h3>
            <p className="text-muted-foreground leading-relaxed">
                Become a driver and earn on your schedule. Our platform offers competitive rates,
                easy-to-use tools, and a supportive community to help you succeed.
            </p>
            <ul className="list-disc list-inside text-left text-muted-foreground mt-2 space-y-1">
                <li>Set your own hours</li>
                <li>Instant payout options</li>
                <li>Dedicated driver support</li>
            </ul>
        </div>
    </div>
</section>


{/* // What Our Users Say*/}
<section className="container py-20 bg-muted/20 dark:bg-muted/30">
    <h2 className="pb-8 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-12">What Our Users Say</h2>
    {/* Placeholder for a Carousel component, you'd integrate one here if available or build a custom solution */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="p-6 flex flex-col items-center text-center shadow-md">
            {/* <Avatar className="mb-4 h-16 w-16">
                <AvatarImage src="/avatars/sarah.jpg" alt="Sarah J." />
                <AvatarFallback>SJ</AvatarFallback>
            </Avatar> */}
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
                "The most reliable and user-friendly ride-sharing app out there. Always on time, always professional."
            </blockquote>
            <p className="text-sm font-semibold mt-4">- Sarah J., Rider</p>
            {/* Optional: Star Rating */}
            <div className="flex mt-2 text-yellow-500">
                {/* Render star icons */}
            </div>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center shadow-md">
            {/* <Avatar className="mb-4 h-16 w-16">
                <AvatarImage src="/avatars/mike.jpg" alt="Mike R." />
                <AvatarFallback>MR</AvatarFallback>
            </Avatar> */}
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
                "Flexible hours and great earning potential. Becoming a driver was the best decision!"
            </blockquote>
            <p className="text-sm font-semibold mt-4">- Mike R., Driver</p>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center shadow-md">
            {/* <Avatar className="mb-4 h-16 w-16">
                <AvatarImage src="/avatars/anna.jpg" alt="Anna L." />
                <AvatarFallback>AL</AvatarFallback>
            </Avatar> */}
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
                "Smooth rides, courteous drivers, and an intuitive app. Highly recommend this service!"
            </blockquote>
            <p className="text-sm font-semibold mt-4">- Anna L., Rider</p>
        </Card>
    </div>
</section>


{/* //Ready to Ride or Drive? */}
// Example structure (Immersive & Layered Card Design)
<section className="relative w-full py-20 bg-muted dark:bg-muted/30 overflow-hidden">
    {/* Optional: Subtle background pattern or image for visual interest */}
    <div className="absolute inset-0 z-0 opacity-10 text-muted-foreground dark:text-muted-foreground/50">
        {/* Using the dot grid SVG again, adjusted for this background */}
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
                <pattern id="dot-grid-cta" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="2" fill="currentColor" fillOpacity="0.08" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid-cta)" />
        </svg>
    </div>

    {/* The main CTA content card */}
    <div className="container relative z-10 flex justify-center">
        <Card className="w-full max-w-3xl p-8 md:p-12 text-center shadow-2xl rounded-xl bg-background/90 backdrop-blur-sm">
            
            <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-foreground">
                Your Next Journey Starts Here.
            </h2>
            
            <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
                Whether you're looking for a quick ride or an opportunity to earn, we've got you covered.
            </p>
            
            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                
                {/* PRIMARY BUTTON: Default variant for strong visibility */}
                <Button 
                    variant="default" 
                    size="lg" 
                    className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    {/* Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                    Download the App
                </Button>

                {/* SECONDARY BUTTON: Outline variant for a softer, secondary action */}
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-3 rounded-full transition-all duration-300"
                >
                    {/* Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-4.04 19.19l-1.39-1.39"/></svg>
                    Become a Driver
                </Button>
            </div>

            {/* App store icons */}
            <div className="flex gap-4 justify-center pt-6 border-t border-border/50 max-w-sm mx-auto">
                <a href="#" aria-label="Download on the App Store"><img src="/app-store-badge.svg" alt="App Store" className="h-9"/></a>
                <a href="#" aria-label="Get it on Google Play"><img src="/google-play-badge.svg" alt="Google Play" className="h-9"/></a>
            </div>
        </Card>
    </div>
</section>
</>
  );
};

export default Banner;

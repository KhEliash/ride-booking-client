 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const WhatUserSay = () => {
    return (
         
      <section className="container py-20 ">
        <h2 className="pb-8 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 flex flex-col items-center text-center shadow-md">
            <Avatar className="mb-4 h-16 w-16">
              <AvatarImage src="/avatars/sarah.jpg" alt="Sarah J." />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
              "The most reliable and user-friendly ride-sharing app out there.
              Always on time, always professional."
            </blockquote>
            <p className="text-sm font-semibold mt-4">- Sarah J., Rider</p>

            <div className="flex mt-2 text-yellow-500">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center shadow-md">
            <Avatar className="mb-4 h-16 w-16">
              <AvatarImage src="/avatars/mike.jpg" alt="Mike R." />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
              "Flexible hours and great earning potential. Becoming a driver was
              the best decision!"
            </blockquote>
            <p className="text-sm font-semibold mt-4">- Mike R., Driver</p>
            <div className="flex mt-2 text-yellow-500">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center shadow-md">
            <Avatar className="mb-4 h-16 w-16">
              <AvatarImage src="/avatars/anna.jpg" alt="Anna L." />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
              "Smooth rides, courteous drivers, and an intuitive app. Highly
              recommend this service!"
            </blockquote>
            <p className="text-sm font-semibold mt-4">- Anna L., Rider</p>
            <div className="flex mt-2 text-yellow-500">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </Card>
        </div>
      </section>
    );
};

export default WhatUserSay;
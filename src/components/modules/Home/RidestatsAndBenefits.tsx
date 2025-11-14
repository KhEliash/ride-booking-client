import { Users, Car, Smile, DollarSign } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const RidestatsAndBenefits = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <section className="w-full  py-16 bg-background relative overflow-hidden">
      <div className="  relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-12 text-center text-foreground">
          Our Impact So Far
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {/* Stat Card: Rides Completed */}
          <div
            data-aos="fade-up"
            className="flex flex-col items-center p-6 bg-muted rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Car className="text-green-400 w-10 h-10 mb-4" />
            <h3 className="text-3xl font-bold text-foreground">12,345+</h3>
            <p className="text-muted-foreground text-center mt-2">
              Rides Completed
            </p>
          </div>

          {/* Stat Card: Active Drivers */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col items-center p-6 bg-muted rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Users className="text-success w-10 h-10 mb-4" />
            <h3 className="text-3xl font-bold text-foreground">1,200+</h3>
            <p className="text-muted-foreground text-center mt-2">
              Active Drivers
            </p>
          </div>

          {/* Stat Card: Happy Users */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col items-center p-6 bg-muted rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Smile className="text-destructive w-10 h-10 mb-4" />
            <h3 className="text-3xl font-bold text-foreground">8,900+</h3>
            <p className="text-muted-foreground text-center mt-2">
              Happy Users
            </p>
          </div>

          {/* Stat Card: Earnings Made */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col items-center p-6 bg-muted rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <DollarSign className=" text-yellow-500 w-10 h-10 mb-4" />
            <h3 className="text-3xl font-bold text-foreground">$1.2M+</h3>
            <p className="text-muted-foreground text-center mt-2">
              Earnings Made
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RidestatsAndBenefits;

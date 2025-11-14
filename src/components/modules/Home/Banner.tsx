import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import banner from "@/assets/images/banner.png";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  if (isLoading) {
    <p>Loading</p>;
  }
  return (
    <>
      <section className="relative container overflow-hidden ">
        <div className="relative z-10 mx-auto flex  flex-col items-center justify-between px-6 py-20 md:flex-row md:py-28 lg:px-12">
          <div data-aos="fade-up" className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-6xl">
              <span className="block">Your Ride,</span>
              <span className="text-primary block">Your Way.</span>
            </h1>

            <p className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-300">
              Book rides instantly, track your driver in real-time, and travel
              with comfort — all from one simple app.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              {user?.role === "admin" && (
                <Link to={"/admin/analytics"}>
                  <Button
                    size="lg"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    Analytics <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {user?.role === "driver" && (
                <Link to={"/driver/manage-rides"}>
                  <Button
                    size="lg"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    Accept a ride <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {user?.role == "rider" && (
                <Link to={"/driver/manage-rides"}>
                  <Link to={"/rider/add-ride"}>
                    <Button
                      size="lg"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      Book a Ride <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </Link>
              )}
              {!user && (
                <Link to={"/driver/manage-rides"}>
                  <Link to={"/rider/add-ride"}>
                    <Button
                      size="lg"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      Book a Ride <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </Link>
              )}

              <Link to={"/about"}>
                <Button size="lg" variant="outline" className="cursor-pointer">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side — Rider Image */}
          <div className="mt-12   flex-1 md:mt-0">
            <img
              src={banner}
              alt="Rider on scooter"
              className="mx-auto md:w-[720px] lg:h-[400px]  shadow-lg rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;

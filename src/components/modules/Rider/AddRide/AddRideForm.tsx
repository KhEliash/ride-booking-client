/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, MapPin } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAddRideMutation } from "@/redux/features/rider/rider.api";
import { toast } from "sonner";

const formSchema = z.object({
  pickupAddress: z
    .string()
    .min(5, "Pickup address must be at least 5 characters."),
  destinationAddress: z
    .string()
    .min(5, "Destination address must be at least 5 characters."),
  pickupLat: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90.")
    .max(90, "Latitude must be between -90 and 90."),
  pickupLng: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180.")
    .max(180, "Longitude must be between -180 and 180."),
  destinationLat: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90.")
    .max(90, "Latitude must be between -90 and 90."),
  destinationLng: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180.")
    .max(180, "Longitude must be between -180 and 180."),
});

type RideFormValues = z.infer<typeof formSchema>;

export function RideBookingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data: userData } = useUserInfoQuery(undefined);
  const [addRide] = useAddRideMutation();

  const form = useForm<RideFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      pickupAddress: "",
      destinationAddress: "",
      pickupLat: undefined,
      pickupLng: undefined,
      destinationLat: undefined,
      destinationLng: undefined,
    } as Partial<RideFormValues>,
  });

  const onSubmit = async (data: RideFormValues) => {
    const rideInfo = {
      riderId: userData?.data?._id,
      pickupLocation: {
        address: data.pickupAddress,
        coordinates: { lat: data.pickupLat, lng: data.pickupLng },
      },
      destination: {
        address: data.destinationAddress,
        coordinates: { lat: data.destinationLat, lng: data.destinationLng },
      },
    };
    try {
      await addRide(rideInfo).unwrap();
      toast.success("Ride created successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Car className="w-5 h-5 text-primary" /> Book Your Ride
          </CardTitle>
          <CardDescription>
            Enter pickup and destination details to request a ride
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* --- Pickup Section --- */}
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Pickup Details
                </h3>

                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="456 Market Rd, City B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="pickupLat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="23.45"
                            {...field}
                            value={
                              field.value === undefined || field.value === null
                                ? ""
                                : field.value
                            }
                            onChange={(e) => {
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pickupLng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="122.65"
                            {...field}
                            value={
                              field.value === undefined || field.value === null
                                ? ""
                                : field.value
                            }
                            onChange={(e) => {
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* --- Destination Section --- */}
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Destination Details
                </h3>

                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="destinationLat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="34.76"
                            {...field}
                            value={
                              field.value === undefined || field.value === null
                                ? ""
                                : field.value
                            }
                            onChange={(e) => {
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destinationLng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="32.867"
                            {...field}
                            value={
                              field.value === undefined || field.value === null
                                ? ""
                                : field.value
                            }
                            onChange={(e) => {
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* --- Submit --- */}
              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

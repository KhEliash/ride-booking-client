/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDriverProfileQuery,
  useAvailabilityMutation,
  useCurrentRideQuery,
  useUpdateRideStatusMutation,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const Availability = () => {
  const { data: driver, isLoading } = useDriverProfileQuery(undefined);
  const { data: currentRide } = useCurrentRideQuery(undefined);
  const [availability, { isLoading: updating }] = useAvailabilityMutation();
  const [statusUpdate] = useUpdateRideStatusMutation();
  const ride = currentRide?.data;

  const [status, setStatus] = useState("");
  useEffect(() => {
    if (ride?.status) {
      setStatus(ride.status);
    }
  }, [ride?.status]);

  if (isLoading)
    return (
      <Card className="max-w-md mx-auto mt-10 p-6">
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mb-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </CardContent>
      </Card>
    );

  const isOnline =
    driver?.data?.isOnline === true || driver?.data?.isOnline === "true"
      ? "true"
      : "false";

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const payload = { isOnline: value };

    try {
      const res = await availability(payload).unwrap();
      toast.success(res.data.message || "Status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleStatusSelect = async (value: string) => {
    const payload = { status: value };
    try {
      const res = await statusUpdate({ id: ride?._id, payload }).unwrap();
      toast.success(res?.message || "Ride status updated successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message || "Something went wrong updating status"
      );
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {/* is online */}
      <div className="col-span-1">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">Driver Availability</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg text-gray-700">Current Status:</span>
              <span
                className={`font-bold text-lg ${
                  isOnline === "true" ? "text-green-600" : "text-red-600"
                }`}
              >
                {isOnline === "true" ? "🟢 Online" : "🔴 Offline"}
              </span>
            </div>

            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Change Availability
              </label>
              <select
                id="availability"
                value={isOnline}
                onChange={handleSelect}
                disabled={updating}
                className="w-1/2 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-60"
              >
                <option value="true">Online</option>
                <option value="false">Offline</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* current ride */}
      <div className="md:col-span-2">
        {!ride && (
          <Card className="">
            <CardHeader>
              <CardTitle>No Current Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You don’t have any ongoing rides right now.
              </p>
            </CardContent>
          </Card>
        )}
        {ride && (
          <Card className="  shadow-md border border-border">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Current Ride
              </CardTitle>
              <Badge variant="outline" className="capitalize">
                {status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Pickup Location:</p>
                <p className="text-muted-foreground">
                  {ride?.pickupLocation?.address}
                </p>
              </div>

              <div>
                <p className="font-medium">Destination:</p>
                <p className="text-muted-foreground">
                  {ride?.destination?.address}
                </p>
              </div>

              <Separator />

              <div className="flex justify-between">
                <p className="font-medium">Fare</p>
                <p className="font-semibold">${ride?.fare}</p>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-1">Change Ride Status</p>
                <Select
                  onValueChange={handleStatusSelect}
                  defaultValue={ride?.status}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(ride?.updatedAt).toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Availability;

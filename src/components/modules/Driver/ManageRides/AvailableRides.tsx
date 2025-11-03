/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useAcceptRideMutation,
  useAvailableRidesQuery,
} from "@/redux/features/driver/driver.api";
import { MapPin, User, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Skeleton } from "@/components/ui/skeleton";

const AvailableRides = () => {
  const { data: availableRides, isLoading } = useAvailableRidesQuery(undefined);
  const [acceptRide] = useAcceptRideMutation();
  const { data: user } = useUserInfoQuery(undefined);
  console.log(user);
  const handleAccept = async (rideId: string) => {
    try {
      const result = await acceptRide(rideId).unwrap();

      toast.success(result.data.message || "Successfully accepted");
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }
  return (
    <div className="space-y-4 p-4  mx-auto">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        Available Rides
      </h2>
      {!availableRides?.data?.length && (
        <div className="text-gray-500 text-center py-8">
          🚗 No available rides right now. Please check back later.
        </div>
      )}

      {availableRides?.data?.map((ride: any) => (
        <Card key={ride._id} className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Ride Request</CardTitle>
                <CardDescription>
                  Requested {format(new Date(ride.requestedAt), "PPp")}
                </CardDescription>
              </div>
              <Badge variant={ride.cancelledAt ? "secondary" : "default"}>
                {ride.cancelledAt ? "Cancelled" : "Pending"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pickup */}
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-sm text-muted-foreground">
                    {ride.pickupLocation.address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ({ride.pickupLocation.coordinates.lat},{" "}
                    {ride.pickupLocation.coordinates.lng})
                  </p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Drop-off</p>
                  <p className="text-sm text-muted-foreground">
                    {ride.destination.address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ({ride.destination.coordinates.lat},{" "}
                    {ride.destination.coordinates.lng})
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{ride.riderId?.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold">
                  {ride.fare.toLocaleString()} USD
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{format(new Date(ride.requestedAt), "p")}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              {/* <Button
                variant="outline"
                onClick={() => handleCancel(ride._id)}
                disabled={!!ride.cancelledAt}
              >
                Cancel
              </Button> */}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    disabled={!!ride.cancelledAt}
                    className="cursor-pointer"
                  >
                    Accept
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to accept this ride?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleAccept(ride._id)}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Confirm Accept
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AvailableRides;

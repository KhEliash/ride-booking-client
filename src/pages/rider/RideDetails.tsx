import { useParams } from "react-router";
import {
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Car,
  Truck,
} from "lucide-react";
import { useGetRideByIdQuery } from "@/redux/features/rider/rider.api";
import { Skeleton } from "@/components/ui/skeleton";

type RideStatus =
  | "pending"
  | "accepted"
  | "completed"
  | "cancelled"
  | "in_transit"
  | "picked_up";

interface StatusDetails {
  icon: React.ElementType;
  color: string;
  text: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const formatDateTime = (isoString: string) => {
  if (!isoString) return "N/A";
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusDetails = (status: RideStatus): StatusDetails => {
  switch (status) {
    case "completed":
      return {
        icon: CheckCircle,
        color:
          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        text: "Completed",
      };
    case "accepted":
      return {
        icon: CheckCircle,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        text: "Accepted",
      };
    case "cancelled":
      return {
        icon: XCircle,
        color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
        text: "Cancelled",
      };
    case "picked_up":
      return {
        icon: Truck,
        color:
          "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
        text: "Picked Up",
      };
    case "in_transit":
      return {
        icon: MapPin,
        color:
          "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
        text: "In Transit",
      };
    default:
      return {
        icon: Clock,
        color:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        text: status
          ? status.charAt(0).toUpperCase() + status.slice(1)
          : "Unknown",
      };
  }
};

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }: CardHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }: CardTitleProps) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);
const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Badge = ({ children, className = "" }: BadgeProps) => (
  <div
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

const RideDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: apiResponse, isLoading, error } = useGetRideByIdQuery(id || "");
  const ride = apiResponse?.data;
  console.log(ride);

  if (!id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-red-500">Invalid ride ID.</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="p-4 shadow-sm ">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
        <Skeleton className="mt-4 h-3 w-full rounded" />
      </div>
    );

  if (error || !ride)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-red-500">
            Error loading ride details.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please try again later or contact support.
          </p>
        </div>
      </div>
    );

  const {
    icon: StatusIcon,
    color: statusColor,
    text: statusText,
  } = getStatusDetails(ride?.status as RideStatus);
  const formattedFare = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(ride.fare / 100);
  const isDriverInfoAvailable =
    ride.driverInfo && ride.status !== "pending" && ride.status !== "cancelled";

  return (
    <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      {/* Header Grid */}
      <header className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Ride Summary
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ride ID: {ride._id.slice(-8)}
          </p>
        </div>
        <div className="flex justify-start md:justify-end items-center">
          <Badge className={`py-2 px-4 text-base font-semibold ${statusColor}`}>
            <StatusIcon className="w-4 h-4 mr-1.5" /> {statusText}
          </Badge>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Route & Fare */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fare Card */}
          <Card className="shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Fare
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {formattedFare}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Requested</p>
                  <p className="text-sm font-medium dark:text-gray-300">
                    {formatDateTime(ride.requestedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Card */}
          <Card className="shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl dark:text-white">
                <MapPin className="w-5 h-5 mr-2 text-primary" /> Route Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                      Pickup
                    </p>
                    <p className="text-sm font-medium dark:text-white mt-1">
                      {ride.pickupLocation.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">
                      Destination
                    </p>
                    <p className="text-sm font-medium dark:text-white mt-1">
                      {ride.destination.address}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Details */}
          {isDriverInfoAvailable && (
            <Card className="shadow-lg border-l-4 border-blue-500 dark:border-l-4 dark:border-blue-700 dark:bg-gray-800  ">
              <CardHeader>
                <CardTitle className="flex items-center text-xl dark:text-white">
                  <User className="w-5 h-5 mr-2 text-blue-500" /> Driver
                  Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Driver Name
                      </p>
                      <p className="text-sm font-medium dark:text-white">
                        {ride.driverInfo?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Car className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Vehicle Model
                      </p>
                      <p className="text-sm font-medium dark:text-white">
                        {ride.driverInfo?.vehicleInfo.model}
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-xs font-bold text-blue-500">
                          #
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">
                          License Plate
                        </p>
                        <p className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded mt-1 dark:text-white">
                          {ride.driverInfo?.vehicleInfo.licensePlate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Timeline */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center text-xl dark:text-white">
                <Clock className="w-5 h-5 mr-2 text-gray-500" /> Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                {/* Timeline items */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 relative">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                        Requested
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDateTime(ride.requestedAt)}
                      </p>
                    </div>
                  </div>

                  {ride.acceptedAt && (
                    <div className="flex items-start space-x-3 relative">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                          Accepted
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(ride.acceptedAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {["picked_up", "in_transit", "completed"].includes(
                    ride.status
                  ) && (
                    <div className="flex items-start space-x-3 relative">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center z-10">
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                          Picked Up
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(ride.acceptedAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* In Transit Timeline Item */}
                  {["in_transit", "completed"].includes(ride.status) && (
                    <div className="flex items-start space-x-3 relative">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center z-10">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                          In Transit
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(ride.acceptedAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {ride.status === "completed" && (
                    <div className="flex items-start space-x-3 relative">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                          Completed
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(ride.completedAt || "")}
                        </p>
                      </div>
                    </div>
                  )}

                  {ride.status === "cancelled" && (
                    <div className="flex items-start space-x-3 relative">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center z-10">
                        <XCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">
                          Cancelled
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(ride.cancelledAt || "")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;

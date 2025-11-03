 import { Skeleton } from "@/components/ui/skeleton";
import {
  useDriverProfileQuery,
  useAvailabilityMutation,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Availability = () => {
  const { data: driver, isLoading } = useDriverProfileQuery(undefined);
  const [availability, { isLoading: updating }] = useAvailabilityMutation();
  console.log(driver);
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

  return (
    <Card className=" max-w-xl mt-10">
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
  );
};

export default Availability;

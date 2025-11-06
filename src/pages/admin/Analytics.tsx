/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAllDriversQuery,
  useAllRidesQuery,
  useAllUsersQuery,
} from "@/redux/features/admin/admin.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Car, DollarSign } from "lucide-react";
import RideVolumeChart from "@/components/modules/admin/analytics/RideVolumeChart ";
import RevenueChart from "@/components/modules/admin/analytics/RevenueChart ";
import DriverActivityChart from "@/components/modules/admin/analytics/DriverActivityChart";

const Analytics = () => {
  const { data: allUsers } = useAllUsersQuery(undefined);
  const { data: allRides } = useAllRidesQuery(undefined);
  const { data: allDrivers, isLoading } = useAllDriversQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  const totalUsers = allUsers?.meta?.total || 0;
  const totalDrivers = allDrivers?.data?.length || 0;
  const totalRides = allRides?.data?.length || 0;

  const totalRevenue = allDrivers?.data?.reduce(
    (acc: number, driver: any) => acc + driver.earnings,
    0
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-green-100">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Total Users <Users />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalUsers}</CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Total Drivers <Car />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalDrivers}
          </CardContent>
        </Card>

        <Card className="bg-yellow-100">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Total Rides <BarChart />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalRides}</CardContent>
        </Card>

        <Card className="bg-fuchsia-100">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Revenue <DollarSign />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            ৳{totalRevenue}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RideVolumeChart rides={allRides?.data} />
        <RevenueChart drivers={allDrivers?.data} />
      </div>

      <DriverActivityChart drivers={allDrivers?.data} />
    </div>
  );
};

export default Analytics;

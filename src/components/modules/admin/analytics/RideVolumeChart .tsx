/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RideVolumeChart = ({ rides }: any) => {
  const monthlyData: Record<string, number> = {};

  rides?.forEach((ride: any) => {
    const month = new Date(ride.createdAt).toLocaleString("default", {
      month: "short",
    });
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const data = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ride Volume (Monthly)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RideVolumeChart;

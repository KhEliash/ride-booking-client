/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DriverActivityChart = ({ drivers }: any) => {
  const online = drivers?.filter((d: any) => d.isOnline).length;
  const offline = drivers?.length - online;
  console.log(drivers);
  const data = [
    { name: "Online", value: online },
    { name: "Offline", value: offline },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DriverActivityChart;

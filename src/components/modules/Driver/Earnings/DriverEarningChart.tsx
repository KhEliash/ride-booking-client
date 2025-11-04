/* eslint-disable @typescript-eslint/no-explicit-any */
 

import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format, parseISO, startOfWeek, startOfMonth } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EarningItem = { date: string; fare: number };

interface EarningsProps {
  earningsHistory: EarningItem[];
}

export function DriverEarnings({ earningsHistory }: EarningsProps) {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  const chartConfig = useMemo(
    () => ({
      earnings: {
        label: "Earnings",
        color:
          view === "daily"
            ? "var(--chart-1)"
            : view === "weekly"
            ? "var(--chart-2)"
            : "var(--chart-3)",
      },
    }),
    [view]
  ) satisfies ChartConfig;

  // Aggregate earnings by view
  const aggregatedData = useMemo(() => {
    const map = new Map<string, number>();

    earningsHistory.forEach(({ date, fare }) => {
      const d = parseISO(date);
      let key = "";

      if (view === "daily") key = format(d, "MMM dd");
      else if (view === "weekly") key = format(startOfWeek(d), "MMM dd");
      else key = format(startOfMonth(d), "MMM yyyy");

      map.set(key, (map.get(key) || 0) + fare / 100);
    });

    return Array.from(map, ([name, total]) => ({ name, total }));
  }, [earningsHistory, view]);

  const totalEarnings = aggregatedData.reduce((sum, d) => sum + d.total, 0);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-bold">Earnings Overview</CardTitle>
          <CardDescription>
            {view === "daily"
              ? "Daily earnings summary"
              : view === "weekly"
              ? "Weekly earnings summary"
              : "Monthly earnings summary"}
          </CardDescription>
        </div>

        <Tabs
          defaultValue="daily"
          onValueChange={(v) => setView(v as any)}
          className="mt-4 sm:mt-0"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={aggregatedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(v) => v.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total"
              fill={chartConfig.earnings.color}
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total: ${totalEarnings.toFixed(2)} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing {view} earnings trend
        </div>
      </CardFooter>
    </Card>
  );
}

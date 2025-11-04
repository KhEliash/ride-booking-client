import { DriverEarnings } from "@/components/modules/Driver/Earnings/DriverEarningChart";
import { useDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";

interface EarningsItem {
  date: string;
  fare: number;
}

type StatEntry = [string, number];

const Earnings = () => {
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useDriverProfileQuery(undefined);

  const earnings: EarningsItem[] = apiResponse?.data?.earningsHistory || [];

  //   console.log(apiResponse?.data?.userId?.name);

  const calculateStats = (earningsArray: EarningsItem[]) => {
    if (earningsArray.length === 0) {
      return {
        totalEarnings: 0,
        averageFare: 0,
        bestDay: ["N/A", 0] as StatEntry,
        bestWeek: ["N/A", 0] as StatEntry,
        bestMonth: ["N/A", 0] as StatEntry,
      };
    }

    const totalEarnings = earningsArray.reduce((acc, e) => acc + e.fare, 0);

    const averageFare = totalEarnings / earningsArray.length;

    const earningsByDay: Record<string, number> = {};
    earningsArray.forEach((e) => {
      const day = format(parseISO(e.date), "yyyy-MM-dd");
      earningsByDay[day] = (earningsByDay[day] || 0) + e.fare;
    });
    const bestDay = Object.entries(earningsByDay).reduce<StatEntry>(
      (a, b) => (a[1] > b[1] ? a : b),
      ["", 0]
    );

    const earningsByWeek: Record<string, number> = {};
    earningsArray.forEach((e) => {
      const weekStart = format(
        startOfWeek(parseISO(e.date), { weekStartsOn: 1 }),
        "yyyy-MM-dd"
      );
      earningsByWeek[weekStart] = (earningsByWeek[weekStart] || 0) + e.fare;
    });
    const bestWeek = Object.entries(earningsByWeek).reduce<StatEntry>(
      (a, b) => (a[1] > b[1] ? a : b),
      ["", 0]
    );

    const earningsByMonth: Record<string, number> = {};
    earningsArray.forEach((e) => {
      const month = format(startOfMonth(parseISO(e.date)), "yyyy-MM");
      earningsByMonth[month] = (earningsByMonth[month] || 0) + e.fare;
    });
    const bestMonth = Object.entries(earningsByMonth).reduce<StatEntry>(
      (a, b) => (a[1] > b[1] ? a : b),
      ["", 0]
    );

    return { totalEarnings, averageFare, bestDay, bestWeek, bestMonth };
  };

  const { totalEarnings, averageFare, bestDay, bestWeek, bestMonth } =
    calculateStats(earnings);

  if (isLoading) {
    return <div className="p-4 text-center">Loading earnings data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">Error loading data.</div>
    );
  }

  if (earnings.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No earnings history available.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        {" "}
        {apiResponse?.data?.userId?.name}'s Earnings Overview 💰
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totalEarnings}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Fare</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {averageFare.toFixed(2)}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Best Day</h3>
          <p className="mt-2 text-lg text-gray-900">
            {bestDay[0]}: **{bestDay[1]}**
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Best Week</h3>
          <p className="mt-2 text-lg text-gray-900">
            {bestWeek[0]}: **{bestWeek[1]}**
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Best Month</h3>
          <p className="mt-2 text-lg text-gray-900">
            {bestMonth[0]}: **{bestMonth[1]}**
          </p>
        </div>
      </div>

      <DriverEarnings earningsHistory={earnings} />
    </div>
  );
};

export default Earnings;

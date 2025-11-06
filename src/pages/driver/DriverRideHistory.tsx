/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDriverRideHistoryQuery } from "@/redux/features/driver/driver.api";

const DriverRideHistory = () => {
  const { data: rideHistory, isLoading } = useDriverRideHistoryQuery(undefined);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) {
    return <div className="p-4 text-center text-lg">Loading...</div>;
  }

  const rides = rideHistory?.data || [];

  const filteredRides = rides?.filter((ride: any) => {
    const pickup = ride?.pickupLocation?.address?.toLowerCase() || "";
    const destination = ride?.destination?.address?.toLowerCase() || "";
    const riderName = ride?.riderId?.name?.toLowerCase() || "";
    return (
      pickup.includes(search.toLowerCase()) ||
      destination.includes(search.toLowerCase()) ||
      riderName.includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
  const paginatedRides = filteredRides.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Card className="py-4  border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">📓 Ride History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Search by address or rider name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Pickup</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fare (৳)</TableHead>
                <TableHead>Completed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRides.length > 0 ? (
                paginatedRides.map((ride: any) => (
                  <TableRow key={ride._id}>
                    <TableCell>{ride?.pickupLocation?.address}</TableCell>
                    <TableCell>{ride?.destination?.address}</TableCell>
                    <TableCell>{ride?.riderId?.name}</TableCell>
                    <TableCell className="capitalize">{ride?.status}</TableCell>
                    <TableCell>{ride?.fare}</TableCell>
                    <TableCell>
                      {new Date(ride?.completedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No ride history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverRideHistory;

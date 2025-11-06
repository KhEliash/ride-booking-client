/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  useCancelRideMutation,
  useRideHistoryQuery,
} from "@/redux/features/rider/rider.api";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Eye } from "lucide-react";
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
import { toast } from "sonner";
import { useNavigate } from "react-router";

type Ride = {
  _id: string;
  pickupLocation: { address: string };
  destination: { address: string };
  fare: number;
  status: string;
  requestedAt: string;
  createdAt: string;
};

const RideHistory = () => {
  const { data, error, isLoading,refetch } = useRideHistoryQuery(undefined);
  const allRides: Ride[] = data?.data || [];

  // Filters and pagination state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const filteredRides = useMemo(() => {
    return allRides.filter((ride) => {
      const query = search.toLowerCase();
      const pickup = ride.pickupLocation.address.toLowerCase();
      const destination = ride.destination.address.toLowerCase();

      const matchesSearch =
        !search || pickup.includes(query) || destination.includes(query);
      const matchesStatus = !status || ride.status === status;
      const matchesFare =
        (!minFare || ride.fare >= Number(minFare)) &&
        (!maxFare || ride.fare <= Number(maxFare));
      const createdAt = new Date(ride.createdAt).getTime();
      const matchesDate =
        (!dateFrom || createdAt >= new Date(dateFrom).getTime()) &&
        (!dateTo || createdAt <= new Date(dateTo).getTime());

      return matchesSearch && matchesStatus && matchesFare && matchesDate;
    });
  }, [allRides, search, status, minFare, maxFare, dateFrom, dateTo]);

  const start = (page - 1) * limit;
  const paginatedRides = filteredRides.slice(start, start + limit);
  const totalPages = Math.ceil(filteredRides.length / limit);

  const [cancelRide] = useCancelRideMutation();
  const navigate =useNavigate()

  const handleCancelRide = async (id: string) => {
    try {
      const res = await cancelRide(id).unwrap();
      toast.success(res.message || "Ride cancelled successfully!");
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel ride");
    }
  };

  const handleViewDetails = (rideId: string) => {
    navigate(`/ride-details/${rideId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500"> Failed to load ride history.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🚗 Ride History</h1>

      {/*  Filters */}
      <div className="grid md:grid-cols-3 gap-4 items-end">
        <div>
          <Label className="mb-2">Search (pickup/destination)</Label>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div>
          <Label className="mb-2">Status</Label>
          <Select
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="requested">Requested</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="mb-2">From</Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className ="flex-1">
            <Label className="mb-2">To</Label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="mb-2">Min Fare</Label>
            <Input
              type="number"
              placeholder="0"
              value={minFare}
              onChange={(e) => {
                setMinFare(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="flex-1">
            <Label className="mb-2">Max Fare</Label>
            <Input
              type="number"
              placeholder="0"
              value={maxFare}
              onChange={(e) => {
                setMaxFare(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <Separator />

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>#</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Cancel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRides.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No rides found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedRides.map((ride, idx) => (
                <TableRow key={ride._id}>
                  <TableCell>{start + idx + 1}</TableCell>
                  <TableCell>{ride.pickupLocation.address}</TableCell>
                  <TableCell>{ride.destination.address}</TableCell>
                  <TableCell>${ride.fare}</TableCell>
                  <TableCell className="capitalize">{ride.status}</TableCell>
                  <TableCell>
                    {new Date(ride.requestedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex justify-center cursor-pointer text-blue-500">
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(ride._id)}
                      >
                        <Eye className="text-blue-500 " />
                      </Button>
                  </TableCell>
                  <TableCell>
                    {ride.status === "requested" ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to cancel this ride?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancelRide(ride._id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              Confirm Cancel
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="justify-center mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <Button
                  size="sm"
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default RideHistory;

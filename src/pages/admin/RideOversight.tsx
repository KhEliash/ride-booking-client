/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useMemo } from "react";
// import { useAllRidesQuery } from "@/redux/features/admin/admin.api";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// const ITEMS_PER_PAGE = 10;

// const RideOversight = () => {
//   const { data: allRides, isLoading } = useAllRidesQuery(undefined);

//   const [searchText, setSearchText] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const [page, setPage] = useState(1);

//   const filteredRides = useMemo(() => {
//     if (!allRides?.data) return [];

//     return allRides.data.filter((ride: any) => {
//       const matchesSearch =
//         ride?.driverId?._id?.name
//           ?.toLowerCase()
//           .includes(searchText.toLowerCase()) ||
//         ride?.riderId?.name?.toLowerCase().includes(searchText.toLowerCase());

//       const matchesStatus = statusFilter ? ride.status === statusFilter : true;

//       const rideDate = new Date(ride.createdAt);

//       const matchesDate =
//         (!fromDate || new Date(fromDate) <= rideDate) &&
//         (!toDate || rideDate <= new Date(toDate));

//       return matchesSearch && matchesStatus && matchesDate;
//     });
//   }, [allRides, searchText, statusFilter, fromDate, toDate]);

//   //  Paginated data
//   const paginatedRides = filteredRides.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="p-6 space-y-5">
//       <h2 className="text-2xl font-semibold">🚕 Ride Oversight</h2>

//       {/* Filters Section */}
//       <div className="flex flex-wrap gap-4">
//         <Input
//           className="w-60"
//           placeholder="Search driver / rider..."
//           value={searchText}
//           onChange={(e) => {
//             setSearchText(e.target.value);
//             setPage(1);
//           }}
//         />

//         <Select onValueChange={(value) => setStatusFilter(value)}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="requested">Requested</SelectItem>
//             <SelectItem value="accepted">Accepted</SelectItem>
//             <SelectItem value="inTransit">In Transit</SelectItem>
//             <SelectItem value="completed">Completed</SelectItem>
//             <SelectItem value="cancelled">Cancelled</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* ✅ Date range filters */}
//         <Input
//           className="w-[180px]"
//           type="date"
//           onChange={(e) => setFromDate(e.target.value)}
//         />
//         <Input
//           className="w-[180px]"
//           type="date"
//           onChange={(e) => setToDate(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border shadow-md bg-white">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Rider</TableHead>
//               <TableHead>Driver</TableHead>
//               <TableHead>Pickup → Destination</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Fare</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {paginatedRides.length ? (
//               paginatedRides.map((ride: any) => (
//                 <TableRow key={ride._id}>
//                   <TableCell>{ride?.riderId?.name}</TableCell>
//                   <TableCell>
//                     {ride?.driverId?._id?.name ?? "Not Assigned"}
//                   </TableCell>

//                   <TableCell>
//                     {ride.pickupLocation.address} → {ride.destination.address}
//                   </TableCell>

//                   <TableCell className="capitalize">{ride.status}</TableCell>
//                   <TableCell>৳{ride.fare}</TableCell>
//                   <TableCell>
//                     {new Date(ride.createdAt).toLocaleDateString()}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center">
//                   No rides found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* ✅ Pagination controls */}
//       <div className="flex justify-between items-center pt-4">
//         <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Previous
//         </Button>

//         <p>
//           Page <b>{page}</b> of{" "}
//           <b>{Math.ceil(filteredRides.length / ITEMS_PER_PAGE)}</b>
//         </p>

//         <Button
//           disabled={page === Math.ceil(filteredRides.length / ITEMS_PER_PAGE)}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RideOversight;

import { useState, useMemo, useEffect } from "react";
import { useAllRidesQuery } from "@/redux/features/admin/admin.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 10;

const RideOversight = () => {
  const { data: allRides, isLoading } = useAllRidesQuery(undefined);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);

  const filteredRides = useMemo(() => {
    if (!allRides?.data) return [];

    return allRides.data.filter((ride: any) => {
      const matchesSearch =
        ride?.driverId?._id?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        ride?.riderId?.name?.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus = statusFilter ? ride.status === statusFilter : true;

      const rideDate = new Date(ride.createdAt);
      const matchesDate =
        (!fromDate || new Date(fromDate) <= rideDate) &&
        (!toDate || rideDate <= new Date(toDate));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [allRides, searchText, statusFilter, fromDate, toDate]);

  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const paginatedRides = filteredRides.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

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

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-2xl font-bold">🪧 Ride Oversight</h2>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">Search</h2>
          <Input
            className="w-60"
            placeholder="Search driver / rider..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">Filter</h2>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="requested">Requested</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="inTransit">In Transit</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">From</h2>
          <Input
            className="w-[180px]"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">To</h2>
          <Input
            className="w-[180px]"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <Button
          className="mt-5 cursor-pointer"
          variant="secondary"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 ">
              <TableHead>Rider</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Pickup → Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedRides.length ? (
              paginatedRides.map((ride: any) => (
                <TableRow key={ride._id}>
                  <TableCell>{ride?.riderId?.name}</TableCell>
                  <TableCell>
                    {ride?.driverId?._id?.name ?? "Not Assigned"}
                  </TableCell>
                  <TableCell>
                    {ride.pickupLocation.address} → {ride.destination.address}
                  </TableCell>
                  <TableCell className="capitalize">{ride.status}</TableCell>
                  <TableCell>৳ {ride.fare}</TableCell>
                  <TableCell>
                    {new Date(ride.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No rides found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>

          <p>
            Page <b>{page}</b> of <b>{totalPages}</b>
          </p>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RideOversight;

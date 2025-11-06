/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  useAllUsersQuery,
  useApproveDriverMutation,
  useBlockUserMutation,
  useSuspendDriverMutation,
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const UserManagements = () => {
  const { data: allUsers, isLoading } = useAllUsersQuery(undefined);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  if (isLoading)
    return <div className="text-center p-4 text-lg">Loading...</div>;

  const users = allUsers?.data || [];

  //  Search
  const filteredUsers = users.filter((user: any) => {
    const name = user?.name?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    const role = user?.role?.toLowerCase() || "";

    const matchesSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      role.includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" ? true : role === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  //  Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  console.log(paginatedUsers);

  const handleBlockToggle = async (user: any) => {
    if (user.isBlocked === true) {
      try {
        const res = await unblockUser(user._id).unwrap();
        toast.success(res?.data.message || "Unblocked successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || " Something went wrong");
      }
    } else {
      try {
        const res = await blockUser(user._id).unwrap();
        toast.success(res?.data.message || "Blocked successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || " Something went wrong");
      }
    }
  };

  const handleApproveToggle = async (user: any) => {
    // console.log("app", user);
    if (user.isApproved === true) {
      try {
        const res = await suspendDriver(user._id).unwrap();
        toast.success(res?.data.message || "Suspend successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || " Something went wrong");
      }
    } else {
      try {
        const res = await approveDriver(user._id).unwrap();
        toast.success(res?.data.message || "Approved successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error?.data?.message || " Something went wrong");
      }
    }
  };

  return (
    <Card className="p-4 m-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Management</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <Input
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-1/2"
          />

          <select
            className="border border-gray-300 rounded-md p-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="driver">Driver</option>
            <option value="rider">Rider</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user: any, index: number) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {(page - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        variant={
                          user.role === "admin"
                            ? "default"
                            : user.role === "driver"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          user.isBlocked
                            ? "destructive"
                            : user.role === "driver" && !user.isApproved
                            ? "secondary"
                            : "default"
                        }
                      >
                        {user.isBlocked
                          ? "Blocked"
                          : user.role === "driver"
                          ? user.isApproved
                            ? "Approved"
                            : "Not Approved"
                          : "Active"}
                      </Badge>
                    </TableCell>

                    <TableCell className="space-x-2">
                      {/* For Riders → Block/Unblock */}
                      {user?.role === "rider" && (
                        <Button
                          size="sm"
                          variant={user.isBlocked ? "default" : "destructive"}
                          onClick={() => handleBlockToggle(user)}
                          className="cursor-pointer"
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      )}

                      {/* For Drivers → Approve/Suspend */}
                      {user.role === "driver" && (
                        <Button
                          size="sm"
                          variant={user.isApproved ? "destructive" : "default"}
                          onClick={() => handleApproveToggle(user)}
                          className="cursor-pointer"
                        >
                          {user.isApproved ? "Suspend" : "Approve"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-3">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
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

export default UserManagements;

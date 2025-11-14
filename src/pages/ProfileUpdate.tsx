/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useDriverProfileQuery } from "@/redux/features/driver/driver.api";
import { useUpdateProfileMutation } from "@/redux/features/admin/admin.api";

import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, UserCheck } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(11, "Enter a valid phone number"),
  model: z.string().optional(),
  licensePlate: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const ProfileUpdate: React.FC = () => {
  const { data: userResp, isLoading: userLoading } =
    useUserInfoQuery(undefined);
  const { data: driverResp, isLoading: driverLoading } =
    useDriverProfileQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const user = userResp?.data;
  const driver = driverResp?.data;

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      model: "",
      licensePlate: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        phone: user.phone || "",
        model: driver?.vehicleInfo?.model || "",
        licensePlate: driver?.vehicleInfo?.licensePlate || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, driver]);

  const onSubmit = async (values: ProfileForm) => {
    try {
      const payload: any = {
        name: values.name,
        phone: values.phone,
      };

      if (user?.role === "driver") {
        payload.vehicleInfo = {
          model: values.model,
          licensePlate: values.licensePlate,
        };
      }

      await updateProfile(payload).unwrap();

      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // loading skeleton UI
  if (userLoading || driverLoading) {
    return (
      <div className=" ">
        <Card>
          <CardContent>
            <div className="flex gap-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=" md:p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md ">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex gap-3">
              <User />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user?.name || "—"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email || "—"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user?.phone || "—"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{user?.role || "—"}</p>
            </div>

            {user?.role === "driver" && (
              <>
                <Separator />
                <h4 className="text-sm font-semibold">Vehicle</h4>

                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">
                    {driver?.vehicleInfo?.model || "—"}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">License Plate</p>
                  <p className="font-medium">
                    {driver?.vehicleInfo?.licensePlate || "—"}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="font-medium">
                    {driver?.isApproved ? "Yes" : "No"}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Online</p>
                  <p className="font-medium">
                    {driver?.isOnline ? "Yes" : "No"}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Update form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex gap-3">
              <UserCheck />
              Update Profile
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="01XXXXXXXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user?.role === "driver" && (
                  <>
                    <Separator />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Toyota Prius" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ABC-1234" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <Button type="submit" disabled={updating} className="w-full">
                  {updating ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileUpdate;

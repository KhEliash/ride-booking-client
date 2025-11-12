/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, BadgeCheck } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(3, { error: "Name must be at least 3 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { error: "Password should be at least 6 chars" }),
    confirmPassword: z
      .string()
      .min(6, { error: "Password should be at least 6 chars" }),
    role: z.enum(["driver", "rider"]),
    vehicleModel: z.string().optional(),
    licensePlate: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "rider",
      vehicleModel: "",
      licensePlate: "",
    },
  });

  const role = useWatch({ control: form.control, name: "role" });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      vehicleInfo: {
        model: data.vehicleModel,
        licensePlate: data.licensePlate,
      },
    };

    try {
      await register(payload).unwrap();
      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className={cn(
        "  grid md:grid-cols-2 items-center justify-center px-6 ",
        className
      )}
      {...props}
    >
      {/* left */}
      <div className="hidden md:flex flex-col justify-center gap-6 pr-12">
        <h1 className="text-4xl font-bold leading-tight">
          Create Your Account 🚀
        </h1>
        <p className="text-muted-foreground text-lg">
          Join the fastest growing ride platform. Whether you're a rider or a
          driver — we've got everything you need.
        </p>

        <div className="flex gap-4 mt-4">
          <div className="p-4 border rounded-xl shadow bg-background/70">
            <Activity className="text-green-500" />
            <p className="font-semibold">Quick Sign Up</p>
            <p className="text-sm text-muted-foreground">
              Start your journey in under 2 minutes.
            </p>
          </div>
          <div className="p-4 border rounded-xl shadow bg-background/70">
            <BadgeCheck className="text-blue-500" />
            <p className="font-semibold">Secure Platform</p>
            <p className="text-sm text-muted-foreground">
              Your information is safe with us.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="w-full max-w-lg min-w-xs mx-auto shadow-md border backdrop-blur-xl bg-background/80">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">
            Register
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Create an account to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Select */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rider">Rider</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Driver Only Fields */}
              {role === "driver" && (
                <>
                  <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota Prius" {...field} />
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
                          <Input placeholder="ABC-1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-medium cursor-pointer"
              >
                Register
              </Button>
            </form>
          </Form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

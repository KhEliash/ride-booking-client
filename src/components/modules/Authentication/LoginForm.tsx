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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import {
  useLoginMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { CloudLightning, Database, Loader2 } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login, { isLoading }] = useLoginMutation();
  const { data: user, isSuccess: isUserLoaded } = useUserInfoQuery(undefined);

  const navigate = useNavigate();

  const handleQuickLogin = async (email: string, password: string) => {
    try {
      await login({ email, password }).unwrap();
      toast.success(`Logged in as ${email}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isUserLoaded && user?.data?.role) {
      const role = user.data.role;

      if (role === "admin") {
        navigate("/admin/analytics", { replace: true });
      } else if (role === "rider") {
        navigate("/rider/add-ride", { replace: true });
      } else if (role === "driver") {
        navigate("/driver/manage-rides", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isUserLoaded, user, navigate]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login(data).unwrap();

      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className={cn(
        " grid md:grid-cols-2 items-center justify-center  md:px-6 ",
        className
      )}
      {...props}
    >
      {/* left side */}
      <div className="hidden md:flex flex-col justify-center gap-6 pr-12">
        <h1 className="text-4xl font-bold leading-tight">Welcome Back 👋</h1>
        <p className="text-muted-foreground text-lg">
          Manage your dashboard, track activities and explore new opportunities
          — everything from one place.
        </p>

        <div className="flex gap-4 mt-4">
          <div className="p-4 border rounded-xl shadow bg-background/70 w-fit">
            <CloudLightning className="text-green-500" />
            <p className="font-semibold">Fast Authentication</p>
            <p className="text-sm text-muted-foreground">
              Secure login using latest security practices.
            </p>
          </div>
          <div className="p-4 border rounded-xl shadow bg-background/70 w-fit">
            <Database className="text-blue-500" />
            <p className="font-semibold">Your Data is Safe</p>
            <p className="text-sm text-muted-foreground">
              Fully encrypted & protected.
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-lg min-w-xs mx-auto shadow-md border backdrop-blur-xl bg-background/80">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to continue your journey.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.com"
                        type="email"
                        className="h-12 rounded-xl"
                        {...field}
                      />
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
                      <Password className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl font-medium cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-center mt-4 text-xl font-semibold">
              Quick Login
            </p>
            <div className="flex gap-4 justify-center my-6">
              <Button
                variant="outline"
                onClick={() => handleQuickLogin("admin@gmail.com", "123456")}
              >
                Admin
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickLogin("rider@gmail.com", "123456")}
              >
                Rider
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickLogin("driver@gmail.com", "123456")}
              >
                Driver
              </Button>
            </div>
          </div>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

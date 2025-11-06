import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) => {
  useEffect(() => {
    console.error("Error:", message);
  }, [message]);

  return (
    <div className="flex justify-center items-center h-[300px] w-full">
      <Card className="w-[350px] text-center p-6">
        <CardContent className="flex flex-col gap-4 items-center">
          <AlertCircle size={42} className="text-red-500" />
          <p className="text-lg font-semibold text-red-600">{message}</p>

          {onRetry && (
            <Button variant="destructive" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorState;

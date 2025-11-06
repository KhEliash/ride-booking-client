import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

const ErrorState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen w-full bg-muted/30 px-4">
      <Card className="w-[420px] shadow-xl border border-red-500/20">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <AlertTriangle className="text-red-600" size={48} />
          <CardTitle className="text-2xl font-semibold text-red-600">
            Something Went Wrong!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center flex flex-col gap-4">
          <p className="text-sm text-gray-600">Unexpected Error</p>

          <div className="flex gap-3 justify-center">
            <Button variant="default" onClick={() => navigate("/")}>
              ⬅ Go Home
            </Button>
            <Button
              variant="destructive"
              onClick={() => window.location.reload()}
            >
              🔄 Reload
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorState;

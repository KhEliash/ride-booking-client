import React from "react";
import { ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Unauthorized: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-muted/30">
      <Card className="w-[380px] text-center p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center gap-2 items-center text-red-600">
            <ShieldAlert size={32} /> Unauthorized Access
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-gray-600 text-sm">
            You do not have permission to view this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;

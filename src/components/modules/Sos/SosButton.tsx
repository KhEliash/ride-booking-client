import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import EmergencyModal from "./EmergencyModal";
 
export default function SOSButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-xl"
        data-aos="fade-up"
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>

      <EmergencyModal open={open} setOpen={setOpen} />
    </>
  );
}

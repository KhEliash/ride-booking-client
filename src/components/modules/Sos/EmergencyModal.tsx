 import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhoneCall, Share2, BellRing } from "lucide-react";

interface EmergencyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function EmergencyModal({
  open,
  setOpen,
}: EmergencyModalProps) {
  const handleCallPolice = () => {
    window.location.href = "tel:999";
  };

  const handleNotifyContact = () => {
    alert("Emergency contact has been notified!");
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        alert(`Live location shared!\nLat: ${latitude}\nLng: ${longitude}`);
      },
      (err) => {
        console.error(err);
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-center">
            Emergency / SOS
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={handleCallPolice}
            className="flex items-center gap-3 p-4 bg-red-600 text-white rounded-lg"
          >
            <PhoneCall /> Call Police (999)
          </button>

          <button
            onClick={handleNotifyContact}
            className="flex items-center gap-3 p-4 bg-yellow-500 text-white rounded-lg"
          >
            <BellRing /> Notify Emergency Contact
          </button>

          <button
            onClick={handleShareLocation}
            className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg"
          >
            <Share2 /> Share Live Location
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

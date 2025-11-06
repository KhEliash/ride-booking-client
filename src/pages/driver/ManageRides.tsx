import AvailableRides from "@/components/modules/Driver/ManageRides/AvailableRides";
import Availability from "@/components/modules/Driver/ManageRides/Availability";

const ManageRides = () => {
  return (
    <>
      <h1 className="text-2xl font-bold py-3">📝 Ride Management</h1>
      <Availability />
      <AvailableRides />
    </>
  );
};

export default ManageRides;

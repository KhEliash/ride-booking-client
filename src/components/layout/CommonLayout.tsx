import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SOSButton from "../modules/Sos/SosButton";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col px-2 md:px-0">
      <Navbar />
      <div className="grow-1">{children}</div>
      <SOSButton />
      <Footer />
    </div>
  );
}

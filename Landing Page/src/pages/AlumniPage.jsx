import { useEffect } from "react";
import Testimonials from "../components/Testimonials";

export default function AlumniPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 lg:pt-32 min-h-screen bg-[#FAF9F6]">
      <Testimonials />
    </div>
  );
}

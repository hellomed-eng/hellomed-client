import { Metadata } from "next";
import UrgentMainBackground from "@/ui/urgent-care/main-background";
import UrgentServicesSection from "@/ui/urgent-care/services-section";
import ReviewsGrid from "@/ui/reviews-grid";
import PlusSign from "@/ui/urgent-care/plus-sign";
import LocationsSection from "@/ui/locations-section";
import HoursTable from "@/ui/hours-table";

export const metadata: Metadata = {
  title: "Urgent Care in Ann Arbor, MI | HELLOMED",
  description:
    "Walk-in urgent care in Ann Arbor with same-day visits, X-ray, labs, and telemedicine. Three convenient locations, open after hours. Book online or walk in today.",
  metadataBase: new URL("https://www.hello-med.com"),
  alternates: {
    canonical: "https://www.hello-med.com/urgent-care",
  },
};

export default function UrgentHome() {
  return (
    <>
      {/* Main background image */}
      <UrgentMainBackground />

      <section className="relative">
        {/* This invisible div is used to scroll to the hours section */}
        <div className="absolute mt-[-94px] md:mt-[-150px]" id="hours"></div>
        {/* Hours Section after image */}
        <div className="flex flex-col space-y-10 items-center pt-10">
          <PlusSign />
          <strong className="uppercase text-center text-5xl md:text-7xl">
            Clinic Hours
          </strong>
          <div className="w-full px-1/12">
            <HoursTable />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <UrgentServicesSection />

      {/* Reviews Section */}
      <div className="grid justify-center justify-items-center pt-16 md:pt-32 gap-y-5 md:gap-y-10">
        <PlusSign />
        <strong className="uppercase text-center text-5xl md:text-7xl">
          Patient Reviews
        </strong>
        <p className="text-center text-3xl md:text-5xl lg:text-6xl text-gray-500">
          Based on Real Reviews
        </p>

        {/* Grid for services */}
        <ReviewsGrid />
      </div>

      {/* Location Section */}
      <div className="grid justify-center justify-items-center pt-16 md:pt-32 gap-y-5 md:gap-y-10">
        <PlusSign />
        <strong className="uppercase text-center text-5xl md:text-7xl">
          Locations
        </strong>
      </div>
      <div className="py-10">
        <LocationsSection />
      </div>
    </>
  );
}

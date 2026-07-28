import { Metadata } from "next";
import PrimaryMainBackground from "@/ui/primary-care/main-background";
import HoursTable from "@/ui/hours-table";
import PrimaryServicesSection from "@/ui/primary-care/services-section";
import PlusSign from "@/ui/urgent-care/plus-sign";
import ReviewsGrid from "@/ui/reviews-grid";
import LocationsSection from "@/ui/locations-section";

export const metadata: Metadata = {
  title: "Primary Care in Ann Arbor, MI | HELLOMED",
  description:
    "Comprehensive primary care services at HELLOMED. Our experienced healthcare providers offer personalized medical care for you and your family in Ann Arbor.",
  metadataBase: new URL("https://hello-med.com"),
  alternates: {
    canonical: "https://www.hello-med.com/primary-care",
  },
};

export default function PrimaryHome() {
  return (
    <>
      {/* Main background image */}
      <PrimaryMainBackground />

      <section className="relative">
        {/* This invisible div is used to scroll to the hours section */}
        <div className="absolute mt-[-94px] md:mt-[-150px]" id="hours"></div>
        {/* Hours Section after image */}
        <div className="flex flex-col space-y-10 items-center pt-10">
          <PlusSign />
          <strong className="uppercase text-5xl md:text-7xl">
            Clinic Hours
          </strong>
          <div className="w-full px-1/12">
            <HoursTable />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <PrimaryServicesSection />

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
      <div className="py-10"></div>
      <LocationsSection />
    </>
  );
}

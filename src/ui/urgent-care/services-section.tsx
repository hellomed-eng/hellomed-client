"use client";

import PlusSign from "@/ui/urgent-care/plus-sign";
import Image from "next/image";
import Link from "next/link";

const urgentServices = [
  { name: "Minor Illness", src: "/urgent-service-0.jpg", href: "" },
  { name: "Minor Injuries", src: "/urgent-service-1.jpg", href: "" },
  {
    name: "Telemedicine",
    src: "/urgent-service-2.jpg",
    href: "/urgent-care/telemedicine",
  },
  {
    name: "Lab Services",
    src: "/urgent-service-3.jpg",
    href: "/urgent-care/lab-services",
  },
  {
    name: "Imaging Services",
    src: "/urgent-service-4.jpg",
    href: "/urgent-care/imaging-services",
  },
  {
    name: "STD Testing",
    src: "/urgent-service-5.jpg",
    href: "/primary-care/std-testing",
  },
];

export default function UrgentServicesSection() {
  return (
    <div className="grid justify-center justify-items-center pt-16 md:pt-32 gap-y-5 md:gap-y-10">
      <PlusSign />
      <strong className="uppercase text-center text-5xl md:text-7xl">
        Services
      </strong>
      <p className="text-center text-2xl md:text-5xl text-gray-500">
        Providing Quality Healthcare
      </p>

      {/* Grid for services */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 md:gap-6 md:p-6 max-w-7xl mx-auto">
        {urgentServices.map(({ name, src, href }) => {
          const content = (
            <>
              <div className="aspect-square relative">
                <Image
                  src={src}
                  alt={name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-60 flex items-center justify-center">
                  <p className="text-white text-center text-lg md:text-xl lg:text-2xl font-semibold px-2">
                    {name}
                  </p>
                </div>
              </div>
            </>
          );
          // TODO(product): "Minor Illness" and "Minor Injuries" have no
          // dedicated page yet. Rendering as non-clickable rather than a
          // fake link until real destination pages exist.
          return href ? (
            <Link
              key={name}
              href={href}
              className="block relative rounded-lg overflow-hidden group"
            >
              {content}
            </Link>
          ) : (
            <div
              key={name}
              className="block relative rounded-lg overflow-hidden cursor-default"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

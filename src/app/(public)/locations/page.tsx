import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { clinicLocations, SICK_VISIT_PRICE } from "@/lib/content/clinic-locations";

export const metadata: Metadata = {
  title: "Urgent Care Locations in Ann Arbor | HELLOMED",
  description:
    "Three HELLOMED walk-in urgent care clinics in Ann Arbor: Central Campus on E Liberty St, North Campus on Plymouth Rd, and inside Meijer on Ann Arbor-Saline Rd. Sick visits from $99.",
  metadataBase: new URL("https://www.hello-med.com"),
  alternates: { canonical: "https://www.hello-med.com/locations" },
};

export default function LocationsIndexPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        HELLOMED Urgent Care Locations in Ann Arbor
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-gray-700">
        Three walk-in clinics across Ann Arbor. No appointment needed, and sick
        visits start at {SICK_VISIT_PRICE}.
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {clinicLocations.map((clinic) => (
          <li
            key={clinic.slug}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="relative h-44">
              <Image
                src={clinic.imageUrl}
                alt={clinic.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-bold">{clinic.name}</h2>
              <p className="mt-1 text-gray-600">{clinic.tagline}</p>
              <p className="mt-3 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {clinic.streetAddress}, Ann Arbor, MI {clinic.postalCode}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${clinic.phoneE164}`} className="hover:underline">
                  {clinic.phoneDisplay}
                </a>
              </p>
              <Link
                href={`/locations/${clinic.slug}`}
                className="mt-5 inline-block rounded-lg bg-hmblue px-4 py-2 text-center font-bold text-white hover:bg-opacity-90"
              >
                Hours, services & directions
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

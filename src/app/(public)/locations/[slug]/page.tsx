import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, CalendarCheck, Car, Languages, Star } from "lucide-react";
import ClinicHours from "@/ui/clinic-hours";
import {
  clinicLocations,
  clinicPageUrl,
  getClinicBySlug,
  SICK_VISIT_PRICE,
  ClinicLocation,
} from "@/lib/content/clinic-locations";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return clinicLocations.map((clinic) => ({ slug: clinic.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) return {};
  const url = clinicPageUrl(clinic.slug);
  return {
    title: clinic.metaTitle,
    description: clinic.metaDescription,
    keywords: clinic.keywords,
    metadataBase: new URL("https://www.hello-med.com"),
    alternates: { canonical: url },
    openGraph: {
      title: clinic.metaTitle,
      description: clinic.metaDescription,
      url,
      siteName: "HELLOMED Urgent Care",
      images: [{ url: `https://www.hello-med.com${encodeURI(clinic.imageUrl)}` }],
      locale: "en_US",
      type: "website",
    },
  };
}

function structuredData(clinic: ClinicLocation) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${clinicPageUrl(clinic.slug)}#clinic`,
    name: clinic.name,
    url: clinicPageUrl(clinic.slug),
    telephone: clinic.phoneE164,
    image: `https://www.hello-med.com${encodeURI(clinic.imageUrl)}`,
    description: clinic.intro,
    priceRange: "$$",
    isAcceptingNewPatients: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: [clinic.streetAddress, clinic.addressLine2]
        .filter(Boolean)
        .join(", "),
      addressLocality: "Ann Arbor",
      addressRegion: "MI",
      postalCode: clinic.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.lat,
      longitude: clinic.lng,
    },
    hasMap: clinic.mapUrl,
    availableLanguage: clinic.languages,
    availableService: clinic.services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.name,
    })),
    parentOrganization: {
      "@type": "MedicalOrganization",
      name: "HELLOMED Urgent Care",
      url: "https://www.hello-med.com",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: clinic.appointmentUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}

export default async function ClinicLocationPage({ params }: PageProps) {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) notFound();

  const otherClinics = clinicLocations.filter((c) => c.slug !== clinic.slug);

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(clinic)) }}
      />

      {/* Header */}
      <section className="bg-hmblue text-white">
        <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2 md:items-center md:py-14">
          <div>
            <Link href="/locations" className="text-sm text-blue-100 hover:underline">
              ← All locations
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-blue-100">
              Walk-in urgent care · Ann Arbor, MI
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{clinic.name}</h1>
            <p className="mt-3 text-lg text-blue-50">{clinic.tagline}</p>
            <address className="mt-5 flex items-start gap-2 not-italic">
              <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>
                {clinic.streetAddress}
                {clinic.addressLine2 && <>, {clinic.addressLine2}</>}
                <br />
                Ann Arbor, MI {clinic.postalCode}
              </span>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${clinic.phoneE164}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-bold text-hmblue hover:bg-blue-50"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {clinic.phoneDisplay}
              </a>
              <a
                href={clinic.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-hmred px-4 py-2 font-bold text-white hover:bg-opacity-90"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book online
              </a>
              <a
                href={clinic.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white px-4 py-2 font-bold text-white hover:bg-white hover:text-hmblue"
              >
                Get directions
              </a>
            </div>
            <p className="mt-4 text-sm text-blue-100">
              Walk-ins welcome. Sick visits start at {SICK_VISIT_PRICE}.
            </p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-xl md:h-80">
            <Image
              src={clinic.imageUrl}
              alt={clinic.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Intro + highlights */}
      <section className="container mx-auto px-4 py-10">
        <p className="max-w-3xl text-lg text-gray-700">{clinic.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 rounded-lg bg-hmpink p-4 font-medium"
            >
              <span className="text-hmred" aria-hidden="true">
                ✓
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      {/* Hours + map */}
      <section className="container mx-auto grid gap-8 px-4 pb-10 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Hours</h2>
          <div className="mt-4">
            <ClinicHours
              hoursMatch={clinic.hoursMatch}
              phoneDisplay={clinic.phoneDisplay}
              phoneE164={clinic.phoneE164}
            />
          </div>
          <dl className="mt-6 space-y-3 text-gray-700">
            <div className="flex items-start gap-2">
              <Car className="mt-0.5 h-5 w-5 shrink-0 text-hmblue" aria-hidden="true" />
              <div>
                <dt className="sr-only">Parking</dt>
                <dd>{clinic.parking}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Languages
                className="mt-0.5 h-5 w-5 shrink-0 text-hmblue"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Languages</dt>
                <dd>Care in {clinic.languages.join(", ")}</dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <iframe
            title={`Map showing ${clinic.name}`}
            src={`https://maps.google.com/maps?q=${clinic.lat},${clinic.lng}&z=15&output=embed`}
            width="100%"
            height="100%"
            className="min-h-[320px]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Services */}
      <section className="bg-hmpink py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Services at this clinic</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clinic.services.map((service) => {
              const content = (
                <>
                  <span className="font-semibold">{service.name}</span>
                  {service.detail && (
                    <span className="mt-1 block text-sm text-gray-600">
                      {service.detail}
                    </span>
                  )}
                </>
              );
              return (
                <li key={service.name}>
                  {service.href ? (
                    <Link
                      href={service.href}
                      className="block h-full rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      {content}
                      <span className="mt-2 block text-sm font-medium text-hmblue">
                        Learn more →
                      </span>
                    </Link>
                  ) : (
                    <div className="h-full rounded-lg bg-white p-4 shadow-sm">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-gray-600">
            Most insurance plans accepted.{" "}
            <Link href="/insurance-information" className="text-hmblue underline">
              See insurance information
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Reviews + other clinics */}
      <section className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Star className="h-6 w-6 text-yellow-500" aria-hidden="true" />
            Visited us recently?
          </h2>
          <p className="mt-2 text-gray-700">
            Your review helps neighbors find walk-in care nearby.
          </p>
          <a
            href={clinic.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-hmblue px-4 py-2 font-bold text-white hover:bg-opacity-90"
          >
            Leave a Google review
          </a>
        </div>
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Other HELLOMED clinics</h2>
          <ul className="mt-4 space-y-3">
            {otherClinics.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/locations/${other.slug}`}
                  className="font-semibold text-hmblue hover:underline"
                >
                  {other.name}
                </Link>
                <p className="text-sm text-gray-600">
                  {other.streetAddress}, Ann Arbor · {other.phoneDisplay}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

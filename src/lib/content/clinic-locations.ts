// Single source of truth for the per-clinic landing pages under /locations.
//
// Keep these details identical to each clinic's Google Business Profile
// (name, address, phone, services). Google compares the two, and mismatches
// weaken local search rankings.
//
// Hours are NOT stored here: they are fetched live from the locations API
// (the same data the admin "Change hours" page edits), matched to a clinic
// with `hoursMatch`.

export interface ClinicService {
  name: string;
  detail?: string;
  href?: string;
}

export interface ClinicLocation {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  streetAddress: string;
  addressLine2?: string;
  postalCode: string;
  phoneDisplay: string;
  phoneE164: string;
  lat: number;
  lng: number;
  mapUrl: string;
  appointmentUrl: string;
  reviewUrl: string;
  imageUrl: string;
  imageAlt: string;
  /** Lower-case keywords matched against the locations API `code`/`title`. */
  hoursMatch: string[];
  highlights: string[];
  services: ClinicService[];
  languages: string[];
  parking: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const SICK_VISIT_PRICE = "$99";

export const clinicLocations: ClinicLocation[] = [
  {
    slug: "central-campus",
    name: "HELLOMED Urgent Care-Central Campus",
    shortName: "Central Campus",
    tagline: "Walk-in urgent care steps from the University of Michigan campus",
    intro:
      "A full walk-in clinic on E Liberty St, just off State Street in downtown Ann Arbor. No appointment needed: get tested, treated and back to class or work in one visit.",
    streetAddress: "625 E Liberty St",
    addressLine2: "Suite 10 (Lower Level)",
    postalCode: "48104",
    phoneDisplay: "(734) 707-1904",
    phoneE164: "+17347071904",
    lat: 42.2794509,
    lng: -83.7411722,
    mapUrl:
      "https://www.google.com/maps/place/HELLOMED+CENTRAL/@42.2794416,-83.742861,17.41z/data=!3m1!5s0x883cae40822b66c1:0xa12c8057c45fcd20!4m6!3m5!1s0x883cafdbcba9f80d:0xe73623ae4cab907e!8m2!3d42.2794509!4d-83.7411722!16s%2Fg%2F11qf_v5z15?entry=ttu",
    appointmentUrl:
      "https://calendar.google.com/calendar/u/0/appointments/AcZssZ1ShT3cr2KENkFggsD0CDqXNIooOQLuYa5o7Xc=",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJDfipy9uvPIgRfpCrTK4jNuc",
    imageUrl: "/central-location.png",
    imageAlt: "HELLOMED Central Campus walk-in clinic near U-M campus in Ann Arbor",
    hoursMatch: ["central"],
    highlights: [
      "Private exam rooms, not a pharmacy corner",
      "Walk right in, no appointment needed",
      "Rapid strep, flu, COVID-19, mono and UTI tests on site",
      "Stitches for minor cuts, IV fluids and STD testing",
      "Many student health plans accepted",
    ],
    services: [
      {
        name: "Sick visits",
        detail: "Colds, flu, sore throat, sinus and ear infections",
        href: "/urgent-care/acute-conditions/cold-flu",
      },
      {
        name: "Strep throat",
        detail: "Rapid strep test during your visit",
        href: "/urgent-care/acute-conditions/strep",
      },
      {
        name: "UTI",
        detail: "Rapid urine test and same-day treatment",
        href: "/urgent-care/acute-conditions/uti",
      },
      {
        name: "Pink eye",
        href: "/urgent-care/acute-conditions/pink-eye",
      },
      {
        name: "Cuts & stitches",
        detail: "Wound care for minor cuts, no ER needed",
        href: "/urgent-care/acute-conditions/cut-laceration",
      },
      {
        name: "Rashes & skin infections",
        href: "/urgent-care/acute-conditions/skin-infection",
      },
      {
        name: "STD testing",
        detail: "Confidential testing and treatment",
        href: "/primary-care/std-testing",
      },
      {
        name: "IV therapy",
        detail: "IV hydration and fluids",
        href: "/primary-care/iv-infusion",
      },
      {
        name: "School & sports physicals",
        href: "/primary-care/physical-exam/school-camp-physical",
      },
      {
        name: "Travel & study abroad physicals",
        href: "/primary-care/physical-exam/study-abroad-physical",
      },
      {
        name: "Pediatric sick visits",
        href: "/urgent-care/acute-conditions/pediatric-urgent-care",
      },
      {
        name: "Video visits",
        detail: "Telehealth for follow-ups and minor conditions",
        href: "/urgent-care/telemedicine",
      },
    ],
    languages: ["English", "Korean", "Spanish"],
    parking: "Metered street parking on E Liberty St and nearby structures",
    metaTitle: "Urgent Care Near U-M Central Campus | Walk-In Clinic Ann Arbor | HELLOMED",
    metaDescription:
      "Walk-in urgent care at 625 E Liberty St, steps from the University of Michigan campus. Sick visits from $99, rapid strep, flu, COVID and UTI tests, stitches and STD testing. No appointment needed.",
    keywords: [
      "urgent care near University of Michigan",
      "walk-in clinic downtown Ann Arbor",
      "urgent care central campus Ann Arbor",
      "strep test Ann Arbor",
      "student urgent care Ann Arbor",
    ],
  },
  {
    slug: "north-campus",
    name: "HELLOMED Urgent Care-North Campus",
    shortName: "North Campus",
    tagline: "Walk-in urgent care with on-site X-ray on Plymouth Rd",
    intro:
      "Our Plymouth Rd clinic near U-M North Campus has free on-site parking, on-site X-ray and EKG, and walk-in care for illnesses, injuries and physicals.",
    streetAddress: "2731 Plymouth Rd",
    postalCode: "48105",
    phoneDisplay: "(734) 210-1122",
    phoneE164: "+17342101122",
    lat: 42.3036726,
    lng: -83.7063491,
    mapUrl:
      "https://www.google.com/maps/place/HELLOMED+North/@42.3037993,-83.7089182,16.7z/data=!3m1!5s0x883cac265eb73f1f:0xe91c7cb229ccc520!4m6!3m5!1s0x883cac2654df9761:0x82dccbb38ec4cca!8m2!3d42.3036726!4d-83.7063491!16s%2Fg%2F1pt_kvcq7?entry=ttu",
    appointmentUrl:
      "https://calendar.google.com/calendar/u/0/appointments/AcZssZ3YAF2k-13KqDQerAO87OY9fx46q7g-8XC_OnM=",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJYZffVCasPIgRykzsOLvMLQg",
    imageUrl: "/north-location.png",
    imageAlt: "HELLOMED North Campus urgent care on Plymouth Rd, Ann Arbor",
    hoursMatch: ["north"],
    highlights: [
      "On-site X-ray and EKG",
      "Free on-site parking",
      "Walk right in, no appointment needed",
      "Stitches for minor cuts",
      "Immigration medical exams (I-693)",
    ],
    services: [
      {
        name: "Sick visits",
        detail: "Colds, flu, sore throat, sinus and ear infections",
        href: "/urgent-care/acute-conditions/cold-flu",
      },
      {
        name: "Strep, bronchitis & pneumonia",
        detail: "Testing and X-ray on site",
        href: "/urgent-care/acute-conditions/strep",
      },
      {
        name: "X-ray",
        detail: "Sprains, possible fractures and chest symptoms",
        href: "/urgent-care/imaging-services",
      },
      {
        name: "EKG",
        detail: "On-site heart rhythm testing",
      },
      {
        name: "Cuts & stitches",
        detail: "Wound care for minor cuts, no ER needed",
        href: "/urgent-care/acute-conditions/cut-laceration",
      },
      {
        name: "UTI",
        href: "/urgent-care/acute-conditions/uti",
      },
      {
        name: "COVID-19 & RSV testing",
        href: "/urgent-care/acute-conditions/covid",
      },
      {
        name: "Pink eye",
        href: "/urgent-care/acute-conditions/pink-eye",
      },
      {
        name: "STD testing",
        detail: "Confidential testing and treatment",
        href: "/primary-care/std-testing",
      },
      {
        name: "Drug screening",
        href: "/primary-care/screening-test/drug-screening",
      },
      {
        name: "Physicals",
        detail: "Annual, school, sports and employment",
        href: "/primary-care/physical-exam/annual-physical",
      },
      {
        name: "Immigration medical exam (I-693)",
        href: "/immigration-medical-exam",
      },
      {
        name: "Flu & COVID-19 vaccines",
      },
      {
        name: "Video visits",
        href: "/urgent-care/telemedicine",
      },
    ],
    languages: ["English", "Korean", "Mandarin"],
    parking: "Free on-site parking lot",
    metaTitle: "Urgent Care North Campus Ann Arbor | X-Ray On Site | HELLOMED",
    metaDescription:
      "Walk-in urgent care at 2731 Plymouth Rd near U-M North Campus. On-site X-ray and EKG, stitches, physicals and immigration exams. Sick visits from $99. Free parking, no appointment needed.",
    keywords: [
      "urgent care Plymouth Rd Ann Arbor",
      "urgent care North Campus Ann Arbor",
      "urgent care with X-ray Ann Arbor",
      "walk-in clinic Ann Arbor",
      "immigration medical exam Ann Arbor",
    ],
  },
  {
    slug: "meijer",
    name: "HELLOMED Urgent Care in Meijer",
    shortName: "Inside Meijer",
    tagline: "Walk-in urgent care inside Meijer on Ann Arbor-Saline Rd",
    intro:
      "Find us inside Meijer, next to the pharmacy. Get diagnosed and treated in one stop with on-site X-ray, rapid tests and IV therapy, then pick up your prescription on the way out.",
    streetAddress: "3145 Ann Arbor-Saline Rd",
    addressLine2: "Inside Meijer, next to the pharmacy",
    postalCode: "48103",
    phoneDisplay: "(734) 255-3185",
    phoneE164: "+17342553185",
    lat: 42.2398356,
    lng: -83.7665247,
    mapUrl:
      "https://www.google.com/maps/place/HELLOMED+South(Inside+Meijer)+Urgent+Care+Ann+Arbor/@42.2398356,-83.7690996,17z/data=!3m1!4b1!4m6!3m5!1s0x883cb16d1922f951:0x3491d30ab536b7e9!8m2!3d42.2398356!4d-83.7665247!16s%2Fg%2F11x38v5w5c?entry=ttu",
    appointmentUrl:
      "https://calendar.google.com/calendar/u/0/appointments/AcZssZ2R7wwx1LOxXF4t5LsMP16McAcJxCW3AX3pI4Y=",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJUfkiGW2xPIgR6bc2tQrTkTQ",
    imageUrl: "/meijer's-location.png",
    imageAlt: "HELLOMED urgent care inside Meijer on Ann Arbor-Saline Rd",
    hoursMatch: ["meijer", "south"],
    highlights: [
      "On-site X-ray and IV therapy",
      "Right next to the Meijer pharmacy",
      "Free parking",
      "Care for adults and kids",
      "Immigration medical exams (I-693)",
    ],
    services: [
      {
        name: "Sick visits",
        detail: "Colds, flu, sore throat, sinus and ear infections",
        href: "/urgent-care/acute-conditions/cold-flu",
      },
      {
        name: "Minor injuries",
        detail: "Sprains, strains, minor burns and bites",
        href: "/urgent-care/acute-conditions/ankle-sprain",
      },
      {
        name: "X-ray",
        detail: "No separate imaging trip",
        href: "/urgent-care/imaging-services",
      },
      {
        name: "IV therapy",
        detail: "IV hydration and fluids",
        href: "/primary-care/iv-infusion",
      },
      {
        name: "Rapid tests",
        detail: "Strep, flu, COVID-19, mono and UTI",
        href: "/urgent-care/lab-services",
      },
      {
        name: "EKG",
      },
      {
        name: "Pediatric sick visits",
        href: "/urgent-care/acute-conditions/pediatric-urgent-care",
      },
      {
        name: "School & sports physicals",
        href: "/primary-care/physical-exam/school-camp-physical",
      },
      {
        name: "STD testing",
        detail: "Confidential testing and treatment",
        href: "/primary-care/std-testing",
      },
      {
        name: "Immigration medical exam (I-693)",
        href: "/immigration-medical-exam",
      },
      {
        name: "Ear wax removal",
      },
      {
        name: "A1C & depression screening",
        href: "/primary-care/screening-test/depression-screening",
      },
      {
        name: "Video visits",
        href: "/urgent-care/telemedicine",
      },
    ],
    languages: ["English", "Korean"],
    parking: "Free parking in the Meijer lot",
    metaTitle: "Urgent Care Inside Meijer Ann Arbor-Saline Rd | X-Ray On Site | HELLOMED",
    metaDescription:
      "Walk-in urgent care inside Meijer at 3145 Ann Arbor-Saline Rd, next to the pharmacy. On-site X-ray, IV therapy and rapid tests, care for adults and kids. Sick visits from $99. No appointment needed.",
    keywords: [
      "urgent care inside Meijer Ann Arbor",
      "urgent care Ann Arbor-Saline Rd",
      "walk-in clinic south Ann Arbor",
      "urgent care with X-ray Ann Arbor",
      "pediatric urgent care Ann Arbor",
    ],
  },
];

export function getClinicBySlug(slug: string): ClinicLocation | undefined {
  return clinicLocations.find((clinic) => clinic.slug === slug);
}

export function clinicPageUrl(slug: string): string {
  return `https://www.hello-med.com/locations/${slug}`;
}

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./page.module.css";
import HoursTable from "@/ui/hours-table";
import LocationsSection from "@/ui/locations-section";
import Carousel from "@/ui/landing-page/carousel";
import ReviewsGrid from "@/ui/reviews-grid";
import homeStructuredData from "@/lib/content/structured-data/home";
import { homeFaqStructuredData } from "@/lib/content/structured-data/home-faq";
import HomeFaqSection from "@/ui/landing-page/home-faq-section";

export const metadata: Metadata = {
  title: "Urgent Care in Ann Arbor, MI | HELLOMED",
  description:
    "Looking for the best urgent care in Ann Arbor? HelloMed offers fast, affordable healthcare solutions at our walk-in clinics on Meijer Ann Arbor-Saline Rd & Plymouth Rd & Liberty St. Open after hours.",
  metadataBase: new URL("https://www.hello-med.com"),
  alternates: {
    canonical: "https://www.hello-med.com",
  },
  openGraph: {
    title: "Best Urgent Care Inside Meijer Ann Arbor-Saline Rd | HELLOMED",
    description:
      "Looking for the best urgent care in Ann Arbor? HelloMed offers fast, affordable healthcare solutions at our walk-in clinics on Plymouth Rd & Meijer Ann Arbor-Saline Rd. Open after hours.",
    url: "https://www.hello-med.com",
    siteName: "HELLOMED Urgent Care",
    images: [
      {
        url: "https://www.hello-med.com/landing-img.webp",
        width: 1200,
        height: 630,
        alt: "HELLOMED Urgent Care Clinic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Urgent Care Inside Meijer Ann Arbor-Saline Rd | HELLOMED",
    description:
      "Looking for the best urgent care in Ann Arbor? HelloMed offers fast, affordable healthcare solutions.",
    images: ["https://www.hello-med.com/landing-img.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LandingPage() {
  return (
    <main className={styles.main}> 
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }} 
      /> 
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeFaqStructuredData),
        }}
      />
      <section className={styles.hero} id="about">
        <div className={styles.heroInner}> 
          <div className={styles.heroContent}> 
            <p className={styles.eyebrow}>Urgent Care Clinic Ann Arbor</p>

            <h1 className={styles.heroTitle}>
              Trusted Urgent & Primary Care in Ann Arbor
            </h1>
            <p className={styles.heroSubtitle}>
              HELLOMED Walk-in Clinic is a neighborhood-focused clinic dedicated
              to providing medical care in an accessible and convenient way. We
              are here to serve the urgent healthcare needs of the Ann Arbor
              community and have been doing so since 2014.
            </p>
            <div className={styles.heroActions}>
             <a href="tel:+17342101122" className={styles.primaryButton}>
                Call (734) 210-1122
              </a>
              <Link
                href="/urgent-care"
                className={`${styles.secondaryButton} ${styles.primaryCareButton}`}
              >
                Explore urgent care
              </Link>
              <Link
                href="/primary-care"
                className={`${styles.secondaryButton} ${styles.primaryCareButton}`}
              >
                Explore primary care
              </Link>
              <Link
                href="/immigration-medical-exam"
                className={`${styles.secondaryButton} ${styles.immigrationButton}`}
              >
                Immigration Medical Exam
              </Link>
              <Link
                href="/insurance-information"
                className={`${styles.secondaryButton} ${styles.insuranceButton}`}
              >
                Insurance Information
              </Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <Image
              src="/landing-img.webp"
              alt="HELLOMED clinic front desk"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 100vw"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.section} id="services">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>
              Care that fits your schedule
            </p>
            <h2 className={styles.sectionTitle}>Walk-In Clinic Ann Arbor</h2>
            <p className={styles.sectionSubtitle}>
              We blend quick access with thoughtful care, so you can get back to
              your day confidently.
            </p>
          </div>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>Fast, friendly visits</h3>
              <p>
                Same-day walk-ins and appointments with a team that takes time
                to listen.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Primary & urgent care</h3>
              <p>
                From annual checkups to unexpected injuries, we are here when
                you need us most.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>Convenient locations</h3>
              <p>
                Community-based three locations in Ann Arbor, easy parking, and
                extended hours for busy schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="reviews">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>What patients say</p>
            <h2 className={styles.sectionTitle}>
              Trusted by the Ann Arbor Community
            </h2>
          </div>
          <ReviewsGrid />
        </div>
      </section>

      <section className={`${styles.sectionAlt} ${styles.carouselSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.carouselWrap}>
            <h2 className={styles.sectionTitle}>What&apos;s new at HELLOMED</h2>
            <p className={styles.sectionSubtitle}>
              Updates, announcements, and community highlights.
            </p>
            <div className={styles.carouselFrame}>
              <Carousel />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} id="hours">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderLight}>
            <h2>Clinic Hours</h2>
            <p>
              Tap each location to see today&apos;s hours and holiday updates.
            </p>
          </div>
          <div className={styles.hoursPanel}>
            <HoursTable />
          </div>
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Questions</p>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <HomeFaqSection />
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionTightBottom}`}
        id="locations"
      >
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Locations</h2>
            <p className={styles.sectionSubtitle}>
              Choose the clinic that works best for you. Appointments are
              available at all three locations.
            </p>
          </div>
          <LocationsSection appointmentLinks />
        </div>
      </section>
    </main>
  );
}

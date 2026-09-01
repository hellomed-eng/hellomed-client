import type { Metadata } from "next";
import Script from "next/script";
import "@/ui/globals.css";
export const metadata: Metadata = {
  title: "HELLOMED Walk-In Urgent Clinic Ann Arbor",
  description:
    "HELLOMED is your trusted walk-in urgent care clinic in Ann Arbor. Visit us for fast, reliable medical care without an appointment.",
  metadataBase: new URL("https://www.hello-med.com"),
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "urgent care near me"
    "urgent care ann arbor",
    "urgent care in Meijer",
    "ann arbor walk in clinic",
    "clinic ann arbor",
    "urgent care plymouth rd",
    "clinics in ann arbor mi",
    "after hours clinic ann arbor",
    "healthcare solutions ann arbor mi",
    "health clinic ann arbor",
    "healthcare solutions ann arbor",
    "walk in clinic ann arbor",
    "best urgent care ann arbor",
    "urgent care clinic ann arbor",
    "urgent care ann arbor-saline rd",
  ],
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="relative antialiased text-gray-900 font-avenirNext">
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-977607860"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-977607860');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

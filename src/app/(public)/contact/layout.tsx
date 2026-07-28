import { Metadata } from "next";

// page.tsx here is a client component ("use client"), which can't export
// `metadata` itself in Next.js. This was previously attempted via a
// metadata.ts file that was never actually imported anywhere, so /contact
// was silently inheriting the root layout's generic metadata. Moving it
// here (a plain server component) is the fix.
export const metadata: Metadata = {
  title: "Contact Us | HELLOMED",
  description:
    "Contact HELLOMED Walk-In Urgent Clinic in Ann Arbor. Find our locations, phone numbers, and get in touch with our healthcare team.",
  metadataBase: new URL("https://www.hello-med.com"),
  alternates: {
    canonical: "https://www.hello-med.com/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

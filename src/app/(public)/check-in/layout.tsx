import { Metadata } from "next";
import "@/ui/globals.css";
import Footer from "@/ui/footer";

// This route collects PHI (name, DOB, insurance card images, medical history).
// It has no informational value for search and should never be indexed.
// Metadata is set here (not in page.tsx) because the check-in pages are
// client components and can't export `metadata` themselves. This also
// covers /check-in/success and /check-in/returning since they inherit it.
export const metadata: Metadata = {
  title: "Check In | HELLOMED",
  description: "Check in for your appointment at HELLOMED.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppointmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Main Content */}
      <div className="flex flex-col justify-center py-10">{children}</div>
    </div>
  );
}

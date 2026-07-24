/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "hellomed-image.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "hellomed-image.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "hellomed-image-public.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "hellomed-image-public.s3.amazonaws.com",
      },
    ],
  },
  reactStrictMode: false,
  async redirects() {
    return [
      // Mapped redirects based on available pages
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/uti",
        destination: "/urgent-care/acute-conditions/uti",
        permanent: true,
      },
      {
        source: "/post/come-prepared-for-your-next-physical-examination",
        destination: "/primary-care/physical-exam/annual-physical",
        permanent: true,
      },
      {
        source: "/physical-exam-primary-care",
        destination: "/primary-care/physical-exam/annual-physical",
        permanent: true,
      },
      {
        source: "/book-online",
        destination: "/make-appointment",
        permanent: true,
      },
      {
        source: "/strep-sinusitis",
        destination: "/acute-conditions/strep",
        permanent: true,
      },
      { source: "/resource", destination: "/check-in", permanent: true },
      {
        source: "/immigration-medical-exam-i-693-1",
        destination: "/immigration-medical-exam",
        permanent: true,
      },
      {
        source: "/no-insurance-plan",
        destination: "/urgent-care/insurance-info/no-insurance-plan",
        permanent: true,
      },
      {
        source: "/telemedicine",
        destination: "/urgent-care/telemedicine",
        permanent: true,
      },
      {
        source: "/cold-flu",
        destination: "/urgent-care/acute-conditions/cold-flu",
        permanent: true,
      },
      {
        source: "/service-page/telemedicine",
        destination: "/urgent-care/telemedicine",
        permanent: true,
      },
      {
        source: "/abdominal-pain",
        destination: "/urgent-care/acute-conditions/abdominal-pain",
        permanent: true,
      },
      {
        source: "/plans-pricing",
        destination: "/urgent-care/insurance-info/no-insurance-plan",
        permanent: true,
      },
      {
        source: "/std",
        destination: "/primary-care/std-testing",
        permanent: true,
      },
      {
        source: "/service-page/wellness-exam",
        destination: "/physical-exam/annual-physical",
        permanent: true,
      },
      {
        source: "/service-page/sports-school-work-physical",
        destination: "/physical-exam/work-physical",
        permanent: true,
      },
      {
        source: "/pink-eye",
        destination: "/urgent-care/acute-conditions/pink-eye",
        permanent: true,
      },
      {
        source: "/services/pink-eye",
        destination: "/urgent-care/acute-conditions/pink-eye",
        permanent: true,
      },
      {
        source: "/service-page/immigration-medical-exam-i-693-1",
        destination: "/immigration-medical-exam",
        permanent: true,
      },
      {
        source: "/geriatric-service",
        destination: "/urgent-care/acute-conditions/geriatric-urgent-care",
        permanent: true,
      },
      {
        source: "/copy-of-uti",
        destination: "/urgent-care/acute-conditions/uti",
        permanent: true,
      },
      {
        source: "/post/telemedicine-urgent-care",
        destination: "/urgent-care/telemedicine",
        permanent: true,
      },
      {
        source: "/insurance",
        destination: "/urgent-care/insurance-info/insurance-accept",
        permanent: true,
      },
      {
        source: "/bookonline",
        destination: "/make-appointment",
        permanent: true,
      },
      {
        source: "/lab-tests-and-gene",
        destination: "/urgent-care/lab-services",
        permanent: true,
      },
      {
        source: "/service-page/telemedicine-self-pay",
        destination: "/urgent-care/telemedicine",
        permanent: true,
      },
      {
        source: "/service-page/std-tests",
        destination: "/primary-care/std-testing",
        permanent: true,
      },
      {
        source: "/services/abdominal-pain",
        destination: "/urgent-care/acute-conditions/abdominal-pain",
        permanent: true,
      },
      {
        source: "/services/physicals",
        destination: "/primary-care/physical-exam/annual-physical",
        permanent: true,
      },
      {
        source: "/covid-19-test",
        destination: "/urgent-care/acute-conditions/covid",
        permanent: true,
      },
      {
        source: "/bookings-checkout/telemedicine",
        destination: "/urgent-care/telemedicine",
        permanent: true,
      },
      {
        source: "/service-page/std-tests-or-other-service",
        destination: "/primary-care/std-testing",
        permanent: true,
      },
      {
        source: "/high-dose-vitamine-infusion",
        destination: "/primary-care/iv-infusion",
        permanent: true,
      },
      {
        source: "/ko/immigration-medical-exam-i-693-1",
        destination: "/immigration-medical-exam",
        permanent: true,
      },
      {
        source: "/es/immigration-medical-exam-i-693-1",
        destination: "/immigration-medical-exam",
        permanent: true,
      },
      {
        source: "/zh/copy-of-uti",
        destination: "/urgent-care/acute-conditions/uti",
        permanent: true,
      },
      {
        source: "/post/telemedicine-urgent-care",
        destination: "/urgent-care/telemedicine",
        permanent: true,
      },
      {
        source: "/zh/service-page/immigration-medical-i693-dr-maio-kim",
        destination: "/immigration-medical-exam",
        permanent: true,
      },
      {
        source: "/zh/geriatric-service",
        destination: "/acute-conditions/geriatric-urgent-care",
        permanent: true,
      },
      {
        source: "/zh/service-page/covid-19-test",
        destination: "/urgent-care/acute-conditions/covid",
        permanent: true,
      },
      {
        source: "/service-page/covid-test-conjunction-w-office-visit",
        destination: "/urgent-care/acute-conditions/covid",
        permanent: true,
      },
      {
        source: "/gerd",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/post/the-benefits-of-receiving-patient-centered-care",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/bookings-checkout/flu-shot",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/bookings-checkout/physical-exam",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/copy-of-gerd",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/general-9",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/contents",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/services/",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/es/bolt-performance",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/es/lab-tests-and-gene",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/ko/covid-19-test",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/zh/service-page/immigration-medical-i693-dr-maio-kim",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/medical-marijuana-counselling",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/service-page/sick-problem-visit",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/post/who-really-owns-your-medical-records",
        destination: "/not-found",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

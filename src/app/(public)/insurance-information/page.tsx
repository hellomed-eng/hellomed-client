import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/external/card";
import { Button } from "@/ui/external/button";

export const metadata: Metadata = {
  title: "Insurance Information | HELLOMED",
  description:
    "Review insurance plans we accept and learn about the Budget Saving Program at HELLOMED in Ann Arbor, Michigan.",
  metadataBase: new URL("https://www.hello-med.com"),
  alternates: {
    canonical: "https://www.hello-med.com/insurance-information",
  },
};

const insurancePlans = [
  { name: "AARP", logo: "/insurance-aarp.jpg" },
  { name: "Aetna", logo: "/insurance-aetna.webp" },
  { name: "Ambetter Health by Meridian", logo: "/insurance-ambetter.png" },
  { name: "BCBS", logo: "/insurance-bcbs.jpg" },
  { name: "BCN", logo: "/insurance-bcn.jpg" },
  { name: "Cigna", logo: "/insurance-cigna.webp" },
  { name: "Cofinity", logo: "/insurance-cofinity.jpg" },
  { name: "HAP (Health Alliance Plan)", logo: "/insurance-hap.png" },
  { name: "Michigan medicaid", logo: "/insurance-michigan-medicaid.png" },
  { name: "Medicare", logo: "/insurance-medicare.jpg" },
  { name: "Meridian", logo: "/insurance-meridian.jpg" },
  { name: "Molina Healthcare", logo: "/insurance-molina.png" },
  { name: "MultiPlan(PHCS) Network", logo: "/insurance-multiplan.webp" },
  { name: "Priority Health", logo: "/insurance-priority-health.png" },
  { name: "Tricare", logo: "/insurance-tricare.svg" },
  { name: "United Healthcare", logo: "/insurance-united-healthcare.png" },
  {
    name: "University of Michigan M-Premier Care",
    logo: "/insurance-um-premier.png",
  },
  { name: "PHP", logo: "/insurance-php.jpeg" },
  {
    name: "University of Michigan Student Insurance",
    logo: "/insurance-um-student.svg",
  },
  { name: "Traveler Insurance", logo: "/insurance-traveler.png" },
];

const includedItems = [
  "Unlimited access to office visits service for minor illnesses and minor injuries",
  "Rapid lab tests inside the clinic for sick visits (strep, mono, flu, etc) limited 2 times/year",
  "X-ray ($200 value)",
  "Free Annual wellness check up with blood test (Comprehensive metabolic panel, Lipid panel, $200 value)",
];

const urgentCarePlans = [
  { title: "Single", price: "$49/month" },
  { title: "Couple", price: "$89/month" },
  { title: "Family(3-4 members)", price: "$159/month" },
];

const primaryCarePlans = [
  { title: "Single", price: "$39/month" },
  { title: "Couple", price: "$75/month" },
  { title: "Family of 3-4", price: "$110/month" },
];

const importantInfo = [
  "Once you enroll and set up the plan, payment will be withdrawn automatically every month for a year.",
  "If you prefer not to enroll in the annual membership, you can still use our services with a one-time payment at a reasonable price.",
  "You can enroll in the service on the booking page.",
  "Call if you have more questions.",
];

export default function InsuranceInformationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl xl:text-5xl font-bold text-center mb-8 xl:my-10">
        Insurance Information
      </h1>

      <section className="mb-16 xl:mb-20">
        <h2 className="text-2xl xl:text-4xl font-bold text-center mb-6 xl:mb-8">
          Insurance Plans We Accept
        </h2>
        <div className="text-sm sm:text-xl xl:text-2xl">
          <p className="text-center text-red-600">
            * As the patient you are always responsible for any charges not paid
            by your insurance.
          </p>
          <p className="text-center mb-8 text-red-600">
            * This list does not cover all insurances we accept. For any
            insurances not on the list, please call the clinic to verify.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {insurancePlans.map((plan) => (
            <Card key={plan.name} className="overflow-hidden">
              <CardContent className="p-4 flex flex-col h-full">
                <div
                  className="relative flex-grow mb-4"
                  style={{ minHeight: "150px" }}
                >
                  <Image
                    src={plan.logo}
                    alt={`${plan.name} logo`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center xl:text-2xl">
                  {plan.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-20 xl:mt-40">
        <div className="border-t-2 border-gray-300 mb-10 xl:mb-16" />
        <h2 className="text-3xl xl:text-5xl font-bold text-center mb-8 xl:my-10">
          No Insurance, No Worries
        </h2>
      </div>

      <section>
        <h2 className="text-2xl xl:text-4xl font-bold text-center mb-6 xl:mb-8">
          Budget Saving Program
        </h2>
        <p className="text-xl xl:text-2xl text-center mb-8 xl:mb-12">
          Annual Membership Program for No Insured or High Deductible Insured
          Patients
        </p>

        <Card className="mb-8 xl:mb-12">
          <CardHeader>
            <CardTitle className="text-2xl xl:text-3xl">
              What&apos;s Included?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 xl:space-y-4">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="mr-2 h-5 w-5 xl:h-6 xl:w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-base xl:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <h3 className="text-xl xl:text-3xl font-bold text-center mb-4">
          Fee Schedule
        </h3>
        <p className="text-center text-base xl:text-lg text-gray-600 mb-8">
          Choose the plan that matches your care type.
        </p>

        <div className="grid gap-10 xl:gap-12">
          <div>
            <h4 className="text-lg xl:text-2xl font-semibold mb-4">
              Urgent Care Plans
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mb-6">
              {urgentCarePlans.map((plan) => (
                <Card key={plan.title}>
                  <CardHeader>
                    <CardTitle className="text-xl xl:text-2xl">
                      {plan.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl xl:text-3xl font-bold">
                      {plan.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <form
              className="text-center"
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="hosted_button_id"
                value="BXEFPJV6ANCZU"
              />
              <table className="w-full">
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        name="on0"
                        value="Budget Saving Program"
                      />
                      Budget Saving Program
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select name="os0">
                        <option value="Singel">
                          Single $49.00 USD - month(s)
                        </option>
                        <option value="Couple">
                          Couple $89.00 USD - month(s)
                        </option>
                        <option value="Family(3-4 members)">
                          Family(3-4 members) $159.00 USD - month(s)
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type="hidden" name="currency_code" value="USD" />
              <input
                className="mt-4"
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Subscribe"
              />
            </form>
          </div>

          <div>
            <h4 className="text-lg xl:text-2xl font-semibold mb-4">
              Primary Care Plans
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mb-6">
              {primaryCarePlans.map((plan) => (
                <Card key={plan.title}>
                  <CardHeader>
                    <CardTitle className="text-xl xl:text-2xl">
                      {plan.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl xl:text-3xl font-bold">
                      {plan.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="text-lg xl:text-xl py-2 xl:py-3 px-4 xl:px-6"
                >
                  Enroll Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 xl:p-8 rounded-lg mt-10 xl:mt-12">
          <h3 className="text-xl xl:text-2xl font-semibold mb-4 xl:mb-6">
            Important Information
          </h3>
          <ul className="space-y-2 xl:space-y-4">
            {importantInfo.map((item) => (
              <li key={item} className="text-base xl:text-lg">
                - {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

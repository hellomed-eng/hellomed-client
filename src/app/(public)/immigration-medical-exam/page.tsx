import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/external/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/external/table";
import { Button } from "@/ui/external/button";

export const metadata: Metadata = {
  title: "Immigration Medical Exam | Civil Surgeon | Green Card Medical I-693",
  description:
    "Complete your immigration medical exam with HelloMed – including blood tests, chest X-ray, body check-up, and health assessment. IRCC-approved panel physician. Fast, affordable service.",
  metadataBase: new URL("https://hello-med.com"),
  alternates: {
    canonical: "https://www.hello-med.com/immigration-medical-exam",
  },
  keywords: [
    "immigration medical exam blood test",
    "immigration medical test",
    "immigration green card medical exam",
    "immigration I693 exam",
    "immigration medical examination",
    "immigration health exam",
  ],
};

export default function ImmigrationMedicalExamPage() {
  return (
    <div className="relative">
      <div className="w-full h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[45vh] xl:h-[50vh] relative">
        <Image
          src="/immigration-medical-exam-uscis.jpg"
          alt="immigration medical exam"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="container mx-auto py-8 px-4">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="text-center space-y-4 mb-6 lg:space-y-0 lg:flex lg:justify-between">
          <h1 className="text-lg md:text-3xl font-bold">
            IMMIGRATION MEDICAL EXAM (I-693)
          </h1>
          <div className="text-center">
            <Link
              href="https://calendar.app.google/gTVcD5f2k28t8qJD8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="text-lg xl:text-xl xl:py-3 px-4 xl:px-6"
              >
                Book appointment
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Immigration Physical Exam and Vaccination Record Forms (I-693){" "}
              <br />
              Located in the international community, we know how we can help
              you. Please book online after you read through the following
              information. Please allow 3-5 business days to complete the form.
              If you need to expedite a process please call us ahead.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Fee Schedule and Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 pb-10 text-red-500 font-semibold">
              <li>
                If you want mailing service for sealed I693 form please bring
                your return envelope
              </li>
              <li>
                $359 - No insurance (The fee includes all lab tests and x-ray if
                necessary)
              </li>
              <li>$259 - With Blood test coverage by your insurance</li>
              <li>
                If you cannot make an appointment online please text at
                734-619-0777 to schedule an appointment
              </li>
            </ul>
            <p className="font-bold mb-2">PRICE DETAILS:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                $359: Includes all paper works in a sealed envelope, Physical
                Health Exam, TB blood Test, Syphilis Blood test, and Gonorrhoeae
                Urine Test. Vaccination record review and counseling. Chest
                X-ray if necessary
              </li>
              <li>
                $259: If you have a health insurance benefit for preventive TB
                blood Test & Gonorrhoeae Urine Test
              </li>
            </ul>
            <p className="mt-4 italic">
              * As the patient you are always responsible for any charges not
              paid by your insurance
            </p>
            <p className="mt-2 font-bold text-red-500">
              THE PRICE DOES NOT INCLUDE VACCINATION FEE
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold">
              What to Bring With for Immigration Medical Exam Blood Test
            </h2>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your photo ID: U.S. Driver&apos;s License or Passport</li>
              <li>
                Please type the first 2 pages of I-693 form (single side), and
                bring the printed copy on your initial visit
              </li>
              <li>
                If you don&apos;t bring your I693 we can type for you with
                additional fee
              </li>
              <li>
                All medical records, including all vaccine records if you have
                (not necessary if you don&apos;t have on your initial visit)
              </li>
              <li>All documents must be in English</li>
              <li>
                If you have positive tuberculosis test in the past please bring
                the valid written document with your name, date of birth
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold">
              Immigration Body Check Up Process
            </h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              To Complete the I-693 immigration medical examination form you
              need to meet three required parts:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>
                Communicable Disease Screening including blood and urine tests
              </li>
              <li>Physical Exam</li>
              <li>Vaccination</li>
            </ol>
            <p className="mb-4 text-sm italic">
              * By USCIS Policy all laboratory tests should be ordered by
              authorized civil surgeon, NOT BY YOUR PRIMARY CARE PHYSICIAN
            </p>

            <h3 className="font-semibold mb-2 mt-6">
              1. Communicable Disease Screening
            </h3>
            <h4 className="font-semibold mb-2">
              (1) Tuberculosis (TB) – For all applicants 2 years of age and
              older.
            </h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You will be screened with tuberculosis blood test.</li>
              <li>
                TB Blood Test: Because of the nature of the time sensitive test
                we don&apos;t do on-site blood drawing and we will give the
                order to use nearby blood drawing station of University of
                Michigan.
              </li>
              <li>
                The test is called the QuantiFERON-TB Gold Test. For this test,
                at least 3ml of a blood sample is required. Results are usually
                available in 3-5 days.
              </li>
              <li>
                To comply the new change by USCIS TB skin test is not accepted,
                effective from 10/01/2018.
              </li>
              <li>
                If the test result shows positive for TB, chest X-ray is
                required.
              </li>
              <li>
                If the chest X-ray results show active TB lesion(s) or
                suspicious finding(s), the applicant is mandatorily referred to
                county health department for further evaluation/treatment.
              </li>
            </ul>

            <h4 className="font-semibold mb-2">(2) Syphilis</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You will be examined by blood test.</li>
              <li>
                If the test result shows positive, additional test is required
                for confirmation.
              </li>
            </ul>

            <h4 className="font-semibold mb-2">
              (3) Gonorrhea and Other Communicable Diseases
            </h4>
            <p className="mb-4">
              Gonorrhea urine test and other communicable diseases will be
              assessed by civil surgeon.
            </p>

            <h3 className="font-semibold mb-2 mt-6">2. Physical Exam</h3>
            <p className="mb-4">
              Our civil surgeon will thoroughly review your immigration medical
              record, then conduct a medical exam. Your medical records will be
              reviewed.
            </p>

            <h3 className="font-semibold mb-2 mt-6">3. Vaccination</h3>
            <p className="mb-4">
              <strong>
                New formula (2026/2027) FLU vaccine is required
                regardless of your past doses
              </strong>
            </p>
            <p className="mb-4">
              The Centers for Disease Control and Prevention (CDC) adopts
              specific vaccination criteria that would be required for any
              person who seeks an immigrant visa or adjustment of status for
              permanent residence. Therefore, all applicants must be up to date
              their vaccination before filing I-693.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                If you have a vaccination record (i.e., proof of vaccination
                including the name of vaccine, date, and provider) and all
                vaccine requirements are met, our provider may not ask
                additional vaccination.
              </li>
              <li>
                If you had certain vaccination but do not have the record, a
                blood test could be performed for evidence of immunity.
              </li>
            </ul>
            <p className="mb-4">
              In general, adults aged between 18 and 64 are required to have
              following vaccination:
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Tdap (Tetanus, Diphtheria, Pertussis)</TableCell>
                  <TableCell>It is good for 10 years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MMR (Measles, Mumps, Rubella)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Varicella (Chickenpox)</TableCell>
                  <TableCell>
                    If you have had a history of varicella, vaccination can be
                    waived but required to test immunity by blood test
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hepatitis B</TableCell>
                  <TableCell>Through 59 years old</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Polio vaccine</TableCell>
                  <TableCell>Required effective 05/01/2024</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Influenza</TableCell>
                  <TableCell>
                    Can waive only if vaccine is not available in the location
                    where the civil surgeon practices
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

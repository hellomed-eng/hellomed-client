"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/ui/external/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/external/card";
import { CheckCircle } from "lucide-react";
import {
  CheckInFormInputs,
  ReturningCheckInFormInputs,
} from "@/lib/types/check-in";
import styles from "./page.module.css";

type FormVariant = "new" | "returning";

export default function CheckInFormSuccessPage() {
  const timer = 20;
  const [newFormData, setNewFormData] = useState<CheckInFormInputs>();
  const [returningFormData, setReturningFormData] =
    useState<ReturningCheckInFormInputs>();
  const [variant, setVariant] = useState<FormVariant>("new");
  const [countdown, setCountdown] = useState(timer);
  const router = useRouter();

  useEffect(() => {
    const storedVariant = sessionStorage.getItem("checkInFormVariant");
    const storedData = sessionStorage.getItem("formData");
    if (storedVariant === "returning" && storedData) {
      setVariant("returning");
      setReturningFormData(JSON.parse(storedData));
    } else if (storedData) {
      setVariant("new");
      setNewFormData(JSON.parse(storedData));
    }

    const timerInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push(variant === "returning" ? "/check-in/returning" : "/check-in");
    }
  }, [countdown, router, variant]);

  const progressPercentage = ((timer - countdown) / timer) * 100;

  const renderField = (label: string, value: string | boolean | undefined) => (
    <div className="border-b border-gray-200 py-2">
      <h3 className="font-semibold text-sm text-gray-600">{label}</h3>
      {label === "ID Image" ||
      label === "Insurance Card Front Image" ||
      label === "Insurance Card Back Image" ? (
        <p className="mt-1">{value ? "Submitted" : "Not submitted"}</p>
      ) : (
        <p className="mt-1">{value || "N/A"}</p>
      )}
    </div>
  );

  const renderReturningSummary = () => {
    const d = returningFormData;
    if (!d) return null;
    return (
      <>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Patient Information</h2>
          {renderField("Name", d.name)}
          {renderField("Birth Date", d.birthDate)}
          {renderField("Phone", d.phone || "No change")}
          {renderField("Email", d.email || "No change")}
          {renderField("Billing Address", d.address || "No change")}
          {renderField(
            "Preferred Pharmacy",
            d.preferredPharmacy || "No change",
          )}
          {renderField(
            "Insurance Card Front Image",
            d.insuranceImageFront,
          )}
          {renderField("Insurance Card Back Image", d.insuranceImageBack)}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Medical Updates</h2>
          {renderField(
            "Medical history changed since last visit",
            d.medicalHistoryChanged,
          )}
          {d.medicalHistoryChanged === "yes" &&
            renderField(
              "Medical history details",
              d.medicalHistoryDescription,
            )}
          {renderField("Medications changed", d.medicationsChanged)}
          {d.medicationsChanged === "yes" &&
            renderField("Medications list", d.medicationsList)}
          {renderField(
            "Medication allergies",
            d.medicationAllergyType === "none"
              ? "No known allergies"
              : d.medicationAllergy,
          )}
          {renderField("Reason for Visit", d.reasonForVisit)}
        </div>
      </>
    );
  };

  const renderNewSummary = () => {
    const d = newFormData;
    if (!d) return null;
    return (
      <>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          {renderField("Name", d.name)}
          {renderField("Birth Date", d.birthDate)}
          {renderField("Phone", d.phone)}
          {renderField("Email", d.email)}
          {renderField("Address", d.address)}
          {renderField("Zipcode", d.zipcode)}
          {renderField("How did you hear about us?", d.hearAboutUs)}
          {renderField("ID Image", d.idImage)}
          {renderField(
            "Insurance Card Front Image",
            d.insuranceImageFront,
          )}
          {renderField("Insurance Card Back Image", d.insuranceImageBack)}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Medical Information</h2>
          {renderField("Medication Allergy", d.medicationAllergy)}
          {renderField("Preferred Pharmacy", d.preferredPharmacy)}
          {renderField("At Home Medication", d.homeMedication)}
          {renderField("Reason for Visit", d.reasonForVisit)}
          {renderField("Recent Exposures", d.exposures)}
          {renderField("Recent Tests", d.recentTests)}
          {renderField("Recent Visits", d.recentVisits)}
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <Card className="w-full">
        <CardHeader>
          <div
            className={`${styles.countdown} text-center text-sm`}
            style={
              {
                "--progress-width": `${100 - progressPercentage}%`,
              } as React.CSSProperties
            }
          >
            This message will close in
            <span className="text-green-600 text-base font-bold mx-1">
              {countdown}
            </span>
            seconds
          </div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center text-green-600">
            <CheckCircle className="mr-2" />
            Check-In Successfully Submitted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-lg">
              Thank you for submitting your check-in information. Here&apos;s a
              summary of your submission:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {variant === "returning"
                ? renderReturningSummary()
                : renderNewSummary()}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <Button
            onClick={() => router.push("/urgent-care")}
            className="w-full sm:w-auto bg-hmred"
          >
            HELLOMED Urgent Care
          </Button>
          <Button
            onClick={() => router.push("/primary-care")}
            className="w-full sm:w-auto bg-hmgreen-dark"
          >
            HELLOMED Primary Care
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { getCheckIn } from "@/apis/check-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/external/card";
import { formatDate } from "@/lib/features/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckInFormOutputs } from "@/lib/types/check-in";
import { getImageFromS3 } from "@/lib/features/image";
import Image from "next/image";
import { CheckInTypeBadge } from "@/components/check-in/CheckInTypeBadge";
import { CheckInDetailField } from "@/components/check-in/CheckInDetailField";
import {
  resolveCheckInFormType,
  displayYesNo,
  displayOptionalUpdate,
  getReturningMedicalHistoryChanged,
  getReturningMedicalHistoryDescription,
  getReturningMedicationsChanged,
  getReturningMedicationsList,
  formatMedicationAllergyDisplay,
} from "@/lib/features/check-in-admin";

function ImageUploadField({
  label,
  src,
  alt,
}: {
  label: string;
  src: string | null;
  alt: string;
}) {
  return (
    <div>
      <dt className="font-medium text-gray-500">{label}</dt>
      <dd className="flex justify-center mt-1">
        {src ? (
          <div
            className="relative w-fit cursor-pointer"
            onClick={() => window.open(src, "_blank")}
          >
            <Image
              src={src}
              alt={alt}
              width={350}
              height={250}
              className="object-contain hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                Click to enlarge
              </span>
            </div>
          </div>
        ) : (
          <span className="text-gray-500 italic">Not submitted</span>
        )}
      </dd>
    </div>
  );
}

export default function CheckInDetailsPage() {
  const params = useParams<{ id: string }>();
  const checkInId = params?.id ? Number(params.id) : null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<CheckInFormOutputs>();
  const [idImageSrc, setIdImageSrc] = useState<string | null>(null);
  const [insuranceImageFrontSrc, setInsuranceImageFrontSrc] = useState<
    string | null
  >(null);
  const [insuranceImageBackSrc, setInsuranceImageBackSrc] = useState<
    string | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCheckIn() {
      if (!checkInId || Number.isNaN(checkInId)) {
        setError("Invalid check-in ID.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await getCheckIn(checkInId);
        setCheckIn(res);

        const formType = resolveCheckInFormType(res);
        if (formType === "new" && res.idImage) {
          setIdImageSrc(await getImageFromS3(`id/checkin-${checkInId}`));
        }
        if (res.insuranceImageFront) {
          setInsuranceImageFrontSrc(
            await getImageFromS3(`insurance-front/checkin-${checkInId}`),
          );
        }
        if (res.insuranceImageBack) {
          setInsuranceImageBackSrc(
            await getImageFromS3(`insurance-back/checkin-${checkInId}`),
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCheckIn();
  }, [checkInId]);

  if (error) {
    return (
      <div className="text-center text-3xl text-red-500 font-bold">{error}</div>
    );
  }

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!checkIn) {
    return null;
  }

  const formType = resolveCheckInFormType(checkIn);
  const isReturning = formType === "returning";
  const medicalHistoryChanged = getReturningMedicalHistoryChanged(checkIn);
  const medicationsChanged = getReturningMedicationsChanged(checkIn);

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="font-large text-blue-500 underline" 
      >
        Back to View Page
      </button>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl">
                Check-in Details: {checkIn.name}
              </h1>
              <CheckInTypeBadge formType={formType} />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CheckInDetailField label="Name" value={checkIn.name} />
            <CheckInDetailField
              label="Birth Date"
              value={formatDate(checkIn.birthDate, "MM/dd/yyyy", "UTC")}
            />
            {isReturning ? (
              <>
                <CheckInDetailField
                  label="Phone (if changed)"
                  value={displayOptionalUpdate(checkIn.phone)}
                />
                <CheckInDetailField
                  label="Email (if changed)"
                  value={displayOptionalUpdate(checkIn.email)}
                />
                <CheckInDetailField
                  label="Billing Address (if changed)"
                  value={displayOptionalUpdate(checkIn.address)}
                  className="sm:col-span-2"
                />
                <CheckInDetailField
                  label="Preferred Pharmacy (if changed)"
                  value={displayOptionalUpdate(checkIn.preferredPharmacy)}
                  className="sm:col-span-2"
                />
              </>
            ) : (
              <>
                <CheckInDetailField label="Phone" value={checkIn.phone} />
                <CheckInDetailField label="Email" value={checkIn.email} />
                <CheckInDetailField
                  label="Address"
                  value={checkIn.address}
                  className="sm:col-span-2"
                />
                <CheckInDetailField label="Zipcode" value={checkIn.zipcode} />
                <CheckInDetailField
                  label="How did you hear about us?"
                  value={checkIn.hearAboutUs}
                />
              </>
            )}
          </dl>
        </CardContent>

        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Medical Information</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {isReturning ? (
              <>
                <CheckInDetailField
                  label="Medical history changed since last visit"
                  value={displayYesNo(medicalHistoryChanged)}
                />
                {medicalHistoryChanged === "yes" && (
                  <CheckInDetailField
                    label="Medical history details"
                    value={getReturningMedicalHistoryDescription(checkIn)}
                    className="sm:col-span-2"
                  />
                )}
                <CheckInDetailField
                  label="Medications changed"
                  value={displayYesNo(medicationsChanged)}
                />
                {medicationsChanged === "yes" && (
                  <CheckInDetailField
                    label="Medications (Name / Dose / Frequency)"
                    value={getReturningMedicationsList(checkIn)}
                    className="sm:col-span-2"
                  />
                )}
                <CheckInDetailField
                  label="Medication allergies"
                  value={formatMedicationAllergyDisplay(checkIn)}
                  className="sm:col-span-2"
                />
              </>
            ) : (
              <>
                <CheckInDetailField
                  label="Medication Allergy"
                  value={checkIn.medicationAllergy}
                />
                <CheckInDetailField
                  label="Preferred Pharmacy"
                  value={checkIn.preferredPharmacy}
                />
                <CheckInDetailField
                  label="At Home Medication"
                  value={checkIn.homeMedication}
                  className="sm:col-span-2"
                />
                <CheckInDetailField
                  label="Recent Exposures"
                  value={checkIn.exposures}
                  className="sm:col-span-2"
                />
                <CheckInDetailField
                  label="Recent Tests"
                  value={checkIn.recentTests}
                  className="sm:col-span-2"
                />
                <CheckInDetailField
                  label="Recent Visits"
                  value={checkIn.recentVisits}
                  className="sm:col-span-2"
                />
              </>
            )}
            <CheckInDetailField
              label="Reason for Visit"
              value={checkIn.reasonForVisit}
              className="sm:col-span-2"
            />
          </dl>
        </CardContent>

        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Uploads</h2>
          <dl className="grid grid-cols-1 gap-4 gap-y-10">
            {!isReturning && (
              <ImageUploadField
                label="ID"
                src={idImageSrc}
                alt="ID card image"
              />
            )}
            <ImageUploadField
              label="Insurance Card Front"
              src={insuranceImageFrontSrc}
              alt="Insurance card image front"
            />
            <ImageUploadField
              label="Insurance Card Back"
              src={insuranceImageBackSrc}
              alt="Insurance card image back"
            />
            <CheckInDetailField
              label="Check-In Time"
              value={formatDate(
                checkIn.created_at,
                "MM/dd/yyyy hh:mm:ss a (zzz)",
              )}
            />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

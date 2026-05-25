import {
  CheckInFormOutputs,
  CheckInFormType,
} from "@/lib/types/check-in";

const RETURNING_MARKER = "returning-patient";

export function resolveCheckInFormType(checkIn: {
  formType?: CheckInFormType | string | null;
  hearAboutUs?: string | null;
}): CheckInFormType {
  if (checkIn.formType === "returning" || checkIn.formType === "new") {
    return checkIn.formType;
  }
  if (checkIn.hearAboutUs === RETURNING_MARKER) {
    return "returning";
  }
  return "new";
}

export function formatCheckInFormTypeLabel(formType: CheckInFormType): string {
  return formType === "returning" ? "Returning" : "New patient";
}

export function displayOptionalUpdate(value: string | null | undefined): string {
  if (value === null || value === undefined || String(value).trim() === "") {
    return "No change";
  }
  return String(value);
}

export function displayYesNo(value: string | null | undefined): string {
  if (!value || String(value).trim() === "") return "—";
  return value === "yes" ? "Yes" : value === "no" ? "No" : String(value);
}

/** Prefer dedicated columns; fall back to legacy overloaded fields for older rows. */
export function getReturningMedicalHistoryChanged(
  checkIn: CheckInFormOutputs,
): string | null | undefined {
  return checkIn.medicalHistoryChanged ?? checkIn.exposures;
}

export function getReturningMedicalHistoryDescription(
  checkIn: CheckInFormOutputs,
): string | null | undefined {
  return checkIn.medicalHistoryDescription ?? checkIn.recentTests;
}

export function getReturningMedicationsChanged(
  checkIn: CheckInFormOutputs,
): string | null | undefined {
  return checkIn.medicationsChanged ?? checkIn.recentVisits;
}

export function getReturningMedicationsList(
  checkIn: CheckInFormOutputs,
): string | null | undefined {
  return checkIn.medicationsList ?? checkIn.homeMedication;
}

export function formatMedicationAllergyDisplay(
  checkIn: CheckInFormOutputs,
): string {
  if (checkIn.medicationAllergyType === "none") {
    return "No known allergies";
  }
  if (checkIn.medicationAllergy?.trim()) {
    return checkIn.medicationAllergy;
  }
  return displayOptionalUpdate(checkIn.medicationAllergy);
}

import {
  CheckInFormOutputs,
  CheckInFormType,
} from "@/lib/types/check-in";
import { formatDate } from "@/lib/features/utils";

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

const MS_MINUTE = 60_000;
const MS_HOUR = 3_600_000;
const MS_DAY = 86_400_000;

/** Submitted column: relative within 24h, exact datetime after. */
export function formatSubmittedAt(
  dateString: string | undefined,
  nowMs: number = Date.now(),
): string {
  if (!dateString) return "";

  const submitted = new Date(dateString);
  if (isNaN(submitted.getTime())) {
    return dateString;
  }

  const diffMs = nowMs - submitted.getTime();
  if (diffMs < MS_MINUTE) return "Just now";

  const diffMinutes = Math.floor(diffMs / MS_MINUTE);
  if (diffMs < MS_HOUR) {
    return diffMinutes === 1 ? "1 min ago" : `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMs / MS_HOUR);
  if (diffMs < MS_DAY) {
    return diffHours === 1 ? "1 hr ago" : `${diffHours} hrs ago`;
  }

  return formatDate(dateString, "MM/dd/yyyy HH:mm");
}

/** Full timestamp for tooltips when the cell shows relative time. */
export function formatSubmittedAtExact(dateString: string | undefined): string {
  if (!dateString) return "";
  const exact = formatDate(dateString, "MM/dd/yyyy HH:mm");
  return exact || dateString;
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

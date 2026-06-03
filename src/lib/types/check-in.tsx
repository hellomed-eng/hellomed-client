export interface CheckInBase {
  name: string;
  birthDate: string;
  email: string;
  reasonForVisit: string;
}

export type CheckInFormType = "new" | "returning";

export interface CheckInImageFields {
  idImage: boolean;
  insuranceImageFront: boolean;
  insuranceImageBack: boolean;
}

/** New-patient form state (UI only; formType added at submit). */
export interface CheckInFormInputs extends CheckInBase, CheckInImageFields {
  phone: string;
  hearAboutUs: string;
  address: string;
  medicationAllergy: string;
  preferredPharmacy: string;
  homeMedication: string;
  exposures: string;
  recentTests: string;
  recentVisits: string;
  zipcode: string;
}

/** Returning-patient form state (UI only; formType added at submit). */
export interface ReturningCheckInFormInputs
  extends CheckInBase,
    CheckInImageFields {
  phone: string;
  address: string;
  preferredPharmacy: string;
  medicalHistoryChanged: string;
  medicalHistoryDescription: string;
  medicationsChanged: string;
  medicationsList: string;
  medicationAllergyType: string;
  medicationAllergy: string;
}

/** POST /api/v1/check-in/ — new patient */
export interface NewCheckInPostBody extends CheckInBase, CheckInImageFields {
  formType: "new";
  phone: string;
  hearAboutUs: string;
  address: string;
  medicationAllergy: string;
  preferredPharmacy: string;
  homeMedication: string;
  exposures: string;
  recentTests: string;
  recentVisits: string;
  zipcode: string;
}

/** POST /api/v1/check-in/ — returning patient */
export interface ReturningCheckInPostBody {
  formType: "returning";
  name: string;
  birthDate: string;
  reasonForVisit: string;
  email?: string;
  phone?: string;
  address?: string;
  preferredPharmacy?: string;
  medicationAllergy?: string;
  medicalHistoryChanged: string;
  medicalHistoryDescription?: string;
  medicationsChanged: string;
  medicationsList?: string;
  medicationAllergyType: string;
  idImage?: boolean;
  insuranceImageFront: boolean;
  insuranceImageBack: boolean;
}

export type CheckInPostBody = NewCheckInPostBody | ReturningCheckInPostBody;

export function toNewCheckInPostBody(
  form: CheckInFormInputs,
): NewCheckInPostBody {
  return {
    formType: "new",
    name: form.name,
    birthDate: form.birthDate,
    phone: form.phone,
    email: form.email,
    hearAboutUs: form.hearAboutUs,
    address: form.address,
    zipcode: form.zipcode,
    medicationAllergy: form.medicationAllergy,
    preferredPharmacy: form.preferredPharmacy,
    homeMedication: form.homeMedication,
    reasonForVisit: form.reasonForVisit,
    exposures: form.exposures,
    recentTests: form.recentTests,
    recentVisits: form.recentVisits,
    idImage: form.idImage,
    insuranceImageFront: form.insuranceImageFront,
    insuranceImageBack: form.insuranceImageBack,
  };
}

export function toReturningCheckInPostBody(
  form: ReturningCheckInFormInputs,
): ReturningCheckInPostBody {
  const medicationAllergy =
    form.medicationAllergyType === "none"
      ? "No known allergies"
      : form.medicationAllergy;

  return {
    formType: "returning",
    name: form.name,
    birthDate: form.birthDate,
    reasonForVisit: form.reasonForVisit,
    email: form.email || undefined,
    phone: form.phone || undefined,
    address: form.address || undefined,
    preferredPharmacy: form.preferredPharmacy || undefined,
    medicationAllergy,
    medicalHistoryChanged: form.medicalHistoryChanged,
    medicalHistoryDescription:
      form.medicalHistoryChanged === "yes"
        ? form.medicalHistoryDescription
        : undefined,
    medicationsChanged: form.medicationsChanged,
    medicationsList:
      form.medicationsChanged === "yes" ? form.medicationsList : undefined,
    medicationAllergyType: form.medicationAllergyType,
    idImage: false,
    insuranceImageFront: form.insuranceImageFront,
    insuranceImageBack: form.insuranceImageBack,
  };
}

// GET API response for entire check in form
export interface CheckInFormOutputs extends CheckInImageFields {
  formType?: CheckInFormType;
  id: number;
  name: string;
  birthDate: string;
  reasonForVisit: string;
  created_at: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  zipcode?: string | null;
  hearAboutUs?: string | null;
  preferredPharmacy?: string | null;
  homeMedication?: string | null;
  exposures?: string | null;
  recentTests?: string | null;
  recentVisits?: string | null;
  medicationAllergy?: string | null;
  medicalHistoryChanged?: string | null;
  medicalHistoryDescription?: string | null;
  medicationsChanged?: string | null;
  medicationsList?: string | null;
  medicationAllergyType?: string | null;
}

// GET API response for check in form board list
export interface CheckInFormBoardDisplay extends CheckInBase {
  id: number;
  formType?: CheckInFormType;
  viewed: boolean;
  created_at: string;
  hearAboutUs?: string | null;
}

// Wrapper type for check in form board list
export interface CheckInFromBoardOutputs {
  checkIns: CheckInFormBoardDisplay[];
  totalCheckIns: number;
}

// Pagination parameters for GET API
export interface GetCheckInsParams {
  size?: number;
  page?: number;
}

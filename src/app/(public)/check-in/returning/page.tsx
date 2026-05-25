"use client";

import { useCallback } from "react";
import { Button } from "@/ui/external/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/external/card";
import { Input } from "@/ui/external/input";
import { Label } from "@/ui/external/label";
import { RadioGroup, RadioGroupItem } from "@/ui/external/radio-group";
import { Textarea } from "@/ui/external/textarea";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/external/select";
import { Checkbox } from "@/ui/external/checkbox";
import {
  ReturningCheckInFormInputs,
  toReturningCheckInPostBody,
} from "@/lib/types/check-in";
import {
  CHECK_IN_FILE_INPUT_CLASS,
  PHARMACY_OPTIONS,
  useCheckInForm,
} from "@/lib/hooks/useCheckInForm";

const INITIAL_FORM: ReturningCheckInFormInputs = {
  name: "",
  birthDate: "",
  email: "",
  reasonForVisit: "",
  phone: "",
  address: "",
  preferredPharmacy: "",
  idImage: false,
  insuranceImageFront: false,
  insuranceImageBack: false,
  medicalHistoryChanged: "",
  medicalHistoryDescription: "",
  medicationsChanged: "",
  medicationsList: "",
  medicationAllergyType: "",
  medicationAllergy: "",
};

export default function ReturningCheckInFormPage() {
  const validate = useCallback((formInputs: ReturningCheckInFormInputs) => {
    const required = [
      formInputs.name !== "",
      formInputs.birthDate !== "",
      formInputs.reasonForVisit !== "",
      formInputs.medicalHistoryChanged !== "",
      formInputs.medicationsChanged !== "",
      formInputs.medicationAllergyType !== "",
    ];
    if (!required.every(Boolean)) return false;

    if (
      formInputs.medicalHistoryChanged === "yes" &&
      formInputs.medicalHistoryDescription.trim() === ""
    ) {
      return false;
    }
    if (
      formInputs.medicationsChanged === "yes" &&
      formInputs.medicationsList.trim() === ""
    ) {
      return false;
    }
    if (
      formInputs.medicationAllergyType === "yes" &&
      formInputs.medicationAllergy.trim() === ""
    ) {
      return false;
    }

    return true;
  }, []);

  const {
    formInputs,
    handleChange,
    handleFileChange,
    handleSubmit,
    agreedToTerms,
    setAgreedToTerms,
    isFormValid,
    isSubmitting,
    tempPreferredPharmacy,
    setTempPreferredPharmacy,
  } = useCheckInForm({
    initialFormInputs: INITIAL_FORM,
    validate: (formInputs, context) => {
      if (formInputs.preferredPharmacy === "others") {
        if (context.tempPreferredPharmacy.trim() === "") return false;
      }
      return validate(formInputs);
    },
    enableIdUpload: false,
    logContextPrefix: "check-in:returning",
    transformBeforeSubmit: (formInputs, { tempPreferredPharmacy }) => {
      const copy = { ...formInputs };
      if (copy.preferredPharmacy === "others") {
        copy.preferredPharmacy = tempPreferredPharmacy;
      }
      return toReturningCheckInPostBody(copy);
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 sm:border-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">
          Returning Patient Check-In
        </CardTitle>
        <Link
          href="/check-in"
          className="text-blue-600 border-blue-600 hover:underline px-4 py-2 rounded-md"
        >
          New Patient?
        </Link>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Patient Information (Confirm / Update)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={formInputs.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date of Birth *</Label>
                <Input
                  name="birthDate"
                  type="date"
                  value={formInputs.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (if changed)</Label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formInputs.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (if changed)</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formInputs.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="address">Billing Address (if changed)</Label>
              <Textarea
                name="address"
                placeholder="Enter billing address if it has changed"
                value={formInputs.address}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="preferredPharmacy">
                Preferred Pharmacy (if changed)
              </Label>
              <Select
                name="preferredPharmacy"
                value={formInputs.preferredPharmacy}
                onValueChange={(value) =>
                  handleChange("preferredPharmacy", value)
                }
              >
                <SelectTrigger id="preferredPharmacy">
                  <SelectValue placeholder="Select only if changed" />
                </SelectTrigger>
                <SelectContent>
                  {PHARMACY_OPTIONS.map((pharmacy) => (
                    <SelectItem key={pharmacy} value={pharmacy}>
                      {pharmacy}
                    </SelectItem>
                  ))}
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              {formInputs.preferredPharmacy === "others" && (
                <Textarea
                  name="tempPreferredPharmacy"
                  placeholder="Please specify your preferred pharmacy"
                  value={tempPreferredPharmacy}
                  onChange={(e) => setTempPreferredPharmacy(e.target.value)}
                  required
                />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Insurance (Update if changed)
            </h3>
            <div className="flex flex-col space-y-2 py-2">
              <Label htmlFor="insuranceFrontUpload">
                Upload Insurance Card (Front)
              </Label>
              <input
                id="insuranceFrontUpload"
                name="insuranceFrontUpload"
                type="file"
                accept="image/*"
                className={CHECK_IN_FILE_INPUT_CLASS}
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col space-y-2 py-2">
              <Label htmlFor="insuranceBackUpload">
                Upload Insurance Card (Back)
              </Label>
              <input
                id="insuranceBackUpload"
                name="insuranceBackUpload"
                type="file"
                accept="image/*"
                className={CHECK_IN_FILE_INPUT_CLASS}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Medical Updates</h3>
            <div className="space-y-2">
              <Label>Any changes to medical history since last visit? *</Label>
              <RadioGroup
                name="medicalHistoryChanged"
                value={formInputs.medicalHistoryChanged}
                onValueChange={(value) =>
                  handleChange("medicalHistoryChanged", value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medical-history-yes" />
                  <Label htmlFor="medical-history-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medical-history-no" />
                  <Label htmlFor="medical-history-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            {formInputs.medicalHistoryChanged === "yes" && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="medicalHistoryDescription">
                  If yes, please describe *
                </Label>
                <Textarea
                  name="medicalHistoryDescription"
                  placeholder="Describe changes to your medical history"
                  value={formInputs.medicalHistoryDescription}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2 mt-4">
              <Label>Any new or changed medications? *</Label>
              <RadioGroup
                name="medicationsChanged"
                value={formInputs.medicationsChanged}
                onValueChange={(value) =>
                  handleChange("medicationsChanged", value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medications-yes" />
                  <Label htmlFor="medications-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medications-no" />
                  <Label htmlFor="medications-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            {formInputs.medicationsChanged === "yes" && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="medicationsList">
                  List medications (Name / Dose / Frequency) *
                </Label>
                <Textarea
                  name="medicationsList"
                  placeholder="Name / Dose / Frequency"
                  value={formInputs.medicationsList}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2 mt-4">
              <Label>Medication Allergies *</Label>
              <RadioGroup
                name="medicationAllergyType"
                value={formInputs.medicationAllergyType}
                onValueChange={(value) =>
                  handleChange("medicationAllergyType", value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="allergy-yes" />
                  <Label htmlFor="allergy-yes">Yes (Describe)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="allergy-none" />
                  <Label htmlFor="allergy-none">No Known Allergies</Label>
                </div>
              </RadioGroup>
            </div>
            {formInputs.medicationAllergyType === "yes" && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="medicationAllergy">Describe allergies *</Label>
                <Textarea
                  name="medicationAllergy"
                  placeholder="List medication allergies"
                  value={formInputs.medicationAllergy}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2 mt-4">
              <Label htmlFor="reasonForVisit">Reason for Visit *</Label>
              <Textarea
                name="reasonForVisit"
                placeholder="Describe your reason for this visit"
                value={formInputs.reasonForVisit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the following terms:
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              We at HelloMed are required by law to maintain the privacy of and
              provide individuals with the attached Notice of our legal duties
              and privacy practices with respect to protected health
              information. If you have any objections to the Notice, please ask
              to speak with our HIPAA Compliance Officer in person or by phone
              at our main phone number. If you would like a copy of the Notice,
              please ask. HelloMed could send an e-mail or call to inform you of
              your test result, follow up or news.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || !agreedToTerms || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Check-In Form"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

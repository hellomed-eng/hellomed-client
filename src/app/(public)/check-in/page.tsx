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
import { CheckInFormInputs, toNewCheckInPostBody } from "@/lib/types/check-in";
import {
  CHECK_IN_FILE_INPUT_CLASS,
  PHARMACY_OPTIONS,
  useCheckInForm,
} from "@/lib/hooks/useCheckInForm";

const INITIAL_FORM: CheckInFormInputs = {
  name: "",
  birthDate: "",
  phone: "",
  email: "",
  hearAboutUs: "",
  address: "",
  medicationAllergy: "",
  preferredPharmacy: "",
  homeMedication: "",
  reasonForVisit: "",
  exposures: "",
  recentTests: "",
  recentVisits: "",
  zipcode: "",
  idImage: false,
  insuranceImageFront: false,
  insuranceImageBack: false,
};

export default function CheckInFormPage() {
  const validate = useCallback(
    (
      formInputs: CheckInFormInputs,
      { tempPreferredPharmacy }: { tempPreferredPharmacy: string },
    ) => {
      const requiredFields = [
        "name",
        "birthDate",
        "phone",
        "email",
        "hearAboutUs",
        "address",
        "zipcode",
        "reasonForVisit",
        "preferredPharmacy",
      ] as const;
      const baseValid = requiredFields.every(
        (field) => formInputs[field] !== "",
      );
      if (!baseValid) return false;
      if (formInputs.preferredPharmacy === "others") {
        return tempPreferredPharmacy !== "";
      }
      return formInputs.preferredPharmacy !== "others";
    },
    [],
  );

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
    validate,
    enableIdUpload: true,
    logContextPrefix: "check-in:new",
    transformBeforeSubmit: (formInputs, { tempPreferredPharmacy }) => {
      const copy = { ...formInputs };
      if (copy.preferredPharmacy === "others") {
        copy.preferredPharmacy = tempPreferredPharmacy;
      }
      return toNewCheckInPostBody(copy);
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 sm:border-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold flex flex-row items-center space-x-2">
          Patient Check-In Form
        </CardTitle>
        <Link
          href="/check-in/returning"
          className="text-blue-600 border-blue-600 hover:underline px-4 py-2 rounded-md"
        >
          Returning Patient?
        </Link>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                name="name"
                placeholder="Full Name"
                value={formInputs.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date *</Label>
              <Input
                name="birthDate"
                type="date"
                value={formInputs.birthDate}
                onChange={handleChange}
                required
              />
            </div>
           <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                name="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={formInputs.phone}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                By providing your phone number, you agree to receive a
                one-time SMS from HelloMed asking for feedback about your
                visit. Msg frequency: 1 msg/visit. Msg &amp; data rates may
                apply. Reply STOP to opt out, HELP for help. See our{" "}
                <Link href="/sms-terms" className="underline hover:text-foreground">
                  SMS Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formInputs.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hearAboutUs">How did you hear about us? *</Label>
            <Select
              name="hearAboutUs"
              value={formInputs.hearAboutUs}
              onValueChange={(value) => handleChange("hearAboutUs", value)}
            >
              <SelectTrigger id="hearAboutUs">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friend">Friend or Family</SelectItem>
                <SelectItem value="Bus Ad">Bus Ad</SelectItem>
                <SelectItem value="bing">Bing</SelectItem>
                <SelectItem value="yelp">Yelp</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="localOnlineCommunity">
                  Local Online Community
                </SelectItem>
                <SelectItem value="walkBy">Walk By</SelectItem>
                <SelectItem value="google">Google</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              name="address"
              placeholder="Enter your full address"
              value={formInputs.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipcode">Zip code *</Label>
            <Input
              name="zipcode"
              placeholder="Enter your zip code"
              value={formInputs.zipcode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicationAllergy">Medication Allergy</Label>
            <Textarea
              name="medicationAllergy"
              placeholder="List any medication allergies"
              value={formInputs.medicationAllergy}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredPharmacy">Preferred Pharmacy *</Label>
            <Select
              name="preferredPharmacy"
              value={formInputs.preferredPharmacy}
              onValueChange={(value) =>
                handleChange("preferredPharmacy", value)
              }
            >
              <SelectTrigger id="preferredPharmacy">
                <SelectValue placeholder="Select an option" />
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

          <div className="space-y-2">
            <Label htmlFor="homeMedication">At Home Medication</Label>
            <Textarea
              name="homeMedication"
              placeholder="List your current medications"
              value={formInputs.homeMedication}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonForVisit">
              Reason for Visit (Main Concern) *
            </Label>
            <Textarea
              name="reasonForVisit"
              placeholder="Describe your main concern"
              value={formInputs.reasonForVisit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>
              Have you had any exposures such as COVID, Strep, Flu, or Mono?
            </Label>
            <RadioGroup
              name="exposures"
              value={formInputs.exposures}
              onValueChange={(value) => handleChange("exposures", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="exposures-yes" />
                <Label htmlFor="exposures-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="exposures-no" />
                <Label htmlFor="exposures-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recentTests">
              Have you been tested for anything in the past week? If so, what
              and what were the results?
            </Label>
            <Textarea
              name="recentTests"
              placeholder="Describe any recent tests and results"
              value={formInputs.recentTests}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recentVisits">
              Have you been seen anywhere else in the past week? If so, did they
              prescribe any medications?
            </Label>
            <Textarea
              name="recentVisits"
              placeholder="Describe any recent medical visits and prescribed medications"
              value={formInputs.recentVisits}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-2 py-4">
            <Label htmlFor="idUpload">Please upload your ID.</Label>
            <input
              id="idUpload"
              name="idUpload"
              type="file"
              accept="image/*"
              className={CHECK_IN_FILE_INPUT_CLASS}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col space-y-2 py-4">
            <Label htmlFor="insuranceFrontUpload">
              Please upload the FRONT SIDE of your insurance card.
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

          <div className="flex flex-col space-y-2 py-4">
            <Label htmlFor="insuranceBackUpload">
              Please upload the BACK SIDE of your insurance card.
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

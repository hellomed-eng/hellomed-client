"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { CheckInFormInputs } from "@/lib/types/check-in";
import { postCheckIn, patchCheckIn } from "@/apis/check-in";
import { postLog } from "@/apis/log";
import { uploadImageToS3 } from "@/lib/features/image";

export default function CheckInFormPage() {
  const router = useRouter();
  const [formInputs, setFormInputs] = useState<CheckInFormInputs>({
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
  });

  const [idImageFile, setIdImageFile] = useState<File | null>(null);
  const [insuranceImageFrontFile, setInsuranceImageFrontFile] =
    useState<File | null>(null);
  const [insuranceImageBackFile, setInsuranceImageBackFile] =
    useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tempPreferredPharmacy, setTempPreferredPharmacy] =
    useState<string>("");

  useEffect(() => {
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
    ];
    const isValid =
      (requiredFields.every(
        (field) => formInputs[field as keyof CheckInFormInputs] !== "",
      ) &&
        formInputs["preferredPharmacy"] !== "others") ||
      (requiredFields.every(
        (field) => formInputs[field as keyof CheckInFormInputs] !== "",
      ) &&
        formInputs["preferredPharmacy"] === "others" &&
        tempPreferredPharmacy !== "");
    setIsFormValid(isValid);
  }, [formInputs, tempPreferredPharmacy]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name;

    if (
      file &&
      file.type.startsWith("image/") &&
      !file.name.toLowerCase().endsWith(".heic")
    ) {
      if (name === "idUpload") {
        setIdImageFile(file);
        setFormInputs((prev) => ({ ...prev, ["idImage"]: true }));
      } else if (name === "insuranceFrontUpload") {
        setInsuranceImageFrontFile(file);
        setFormInputs((prev) => ({ ...prev, ["insuranceImageFront"]: true }));
      } else {
        setInsuranceImageBackFile(file);
        setFormInputs((prev) => ({
          ...prev,
          ["insuranceImageBack"]: true,
        }));
      }
    } else {
      if (name === "idUpload") {
        setIdImageFile(null);
        setFormInputs((prev) => ({ ...prev, ["idImage"]: false }));
      } else if (name === "insuranceFrontUpload") {
        setInsuranceImageFrontFile(null);
        setFormInputs((prev) => ({
          ...prev,
          ["insuranceImageFront"]: false,
        }));
      } else {
        setInsuranceImageBackFile(null);
        setFormInputs((prev) => ({
          ...prev,
          ["insuranceImageBack"]: false,
        }));
      }
      alert("Please select a valid image file. HEIC files are not supported.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    // Assign the user custom preferred pharmacy to the form inputs
    if (formInputs["preferredPharmacy"] === "others") {
      formInputs["preferredPharmacy"] = tempPreferredPharmacy;
    }

    // Upload check in form data to database
    const { id } = await postCheckIn(formInputs);

    // Upload images to S3
    // When uploading, try first and revert database flag if failed
    // Also revert formData state flag so the success page shows the correct information
    // Log error details to database
    // Applies to all three images
    if (idImageFile) {
      try {
        await uploadImageToS3(idImageFile, `id/checkin-${id}`);
      } catch (error) {
        await patchCheckIn(id, "idImage");
        setFormInputs((prev) => ({ ...prev, ["idImage"]: false }));
        await postLog({
          type: "error",
          context: "check-in:page:handleSubmit:idImageFile",
          message: error.message,
        });
      }
    }
    if (insuranceImageFrontFile) {
      try {
        await uploadImageToS3(
          insuranceImageFrontFile,
          `insurance-front/checkin-${id}`,
        );
      } catch (error) {
        await patchCheckIn(id, "insuranceImageFront");
        setFormInputs((prev) => ({ ...prev, ["insuranceImageFront"]: false }));
        await postLog({
          type: "error",
          context: "check-in:page:handleSubmit:insuranceImageFrontFile",
          message: error.message,
        });
      }
    }
    if (insuranceImageBackFile) {
      try {
        await uploadImageToS3(
          insuranceImageBackFile,
          `insurance-back/checkin-${id}`,
        );
      } catch (error) {
        await patchCheckIn(id, "insuranceImageBack");
        setFormInputs((prev) => ({ ...prev, ["insuranceImageBack"]: false }));
        await postLog({
          type: "error",
          context: "check-in:page:handleSubmit:insuranceImageBackFile",
          message: error.message,
        });
      }
    }

    // Store form data in sessionStorage for view in success page
    const formInputsCopy = { ...formInputs };
    sessionStorage.setItem("formData", JSON.stringify(formInputsCopy));

    // Redirect to the success page
    router.push("/check-in/success");
  };

  const handleChange = (
    nameOrEvent:
      | string
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    value?: string,
  ) => {
    if (typeof nameOrEvent === "string") {
      // Handle Select and RadioGroup changes
      setFormInputs((prev) => ({ ...prev, [nameOrEvent]: value }));
    } else {
      // Handle Input, Textarea, and native Select changes
      const { name, value } = nameOrEvent.target;
      setFormInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 sm:border-4">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold flex flex-row items-center space-x-2">
          Patient Check-In Form
        </CardTitle>
        <Link
          href="/"
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
                <SelectItem value="CVS - 209 S State St, Ann Arbor, MI 48104">
                  CVS - 209 S State St, Ann Arbor, MI 48104
                </SelectItem>
                <SelectItem value="CVS - 3535 Plymouth Rd, Ann Arbor, MI 48105">
                  CVS - 3535 Plymouth Rd, Ann Arbor, MI 48105
                </SelectItem>
                <SelectItem value="Kroger - 2641 Plymouth Rd, Ann Arbor, MI 48105">
                  Kroger - 2641 Plymouth Rd, Ann Arbor, MI 48105
                </SelectItem>
                <SelectItem value="Walgreen - 317 S State St, Ann Arbor, MI 48104">
                  Walgreen - 317 S State St, Ann Arbor, MI 48104
                </SelectItem>
                <SelectItem value="Meijer pharmacy - 3145 Ann Arbor-Saline Rd, Ann Arbor, MI 48103">
                  Meijer pharmacy - 3145 Ann Arbor-Saline Rd, Ann Arbor, MI
                  48103
                </SelectItem>
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
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
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
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
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
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
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

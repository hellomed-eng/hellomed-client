import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postCheckIn, patchCheckIn } from "@/apis/check-in";
import { postLog } from "@/apis/log";
import { uploadImageToS3 } from "@/lib/features/image";
import {
  CheckInImageFields,
  CheckInPostBody,
} from "@/lib/types/check-in";

export const CHECK_IN_FILE_INPUT_CLASS =
  "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer";

export const PHARMACY_OPTIONS = [
  "CVS - 209 S State St, Ann Arbor, MI 48104",
  "CVS - 3535 Plymouth Rd, Ann Arbor, MI 48105",
  "Kroger - 2641 Plymouth Rd, Ann Arbor, MI 48105",
  "Walgreen - 317 S State St, Ann Arbor, MI 48104",
  "Meijer pharmacy - 3145 Ann Arbor-Saline Rd, Ann Arbor, MI 48103",
] as const;

type ValidateContext = {
  tempPreferredPharmacy: string;
};

type UseCheckInFormOptions<T extends CheckInImageFields> = {
  initialFormInputs: T;
  validate: (formInputs: T, context: ValidateContext) => boolean;
  transformBeforeSubmit: (
    formInputs: T,
    context: ValidateContext,
  ) => CheckInPostBody;
  enableIdUpload?: boolean;
  successPath?: string;
  sessionStorageKey?: string;
  logContextPrefix?: string;
};

export function useCheckInForm<T extends CheckInImageFields>({
  initialFormInputs,
  validate,
  transformBeforeSubmit,
  enableIdUpload = false,
  successPath = "/check-in/success",
  sessionStorageKey = "formData",
  logContextPrefix = "check-in",
}: UseCheckInFormOptions<T>) {
  const router = useRouter();
  const [formInputs, setFormInputs] = useState<T>(initialFormInputs);
  const [idImageFile, setIdImageFile] = useState<File | null>(null);
  const [insuranceImageFrontFile, setInsuranceImageFrontFile] =
    useState<File | null>(null);
  const [insuranceImageBackFile, setInsuranceImageBackFile] =
    useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempPreferredPharmacy, setTempPreferredPharmacy] = useState("");

  useEffect(() => {
    setIsFormValid(validate(formInputs, { tempPreferredPharmacy }));
  }, [formInputs, tempPreferredPharmacy, validate]);

  const handleChange = (
    nameOrEvent:
      | string
      | ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    value?: string,
  ) => {
    if (typeof nameOrEvent === "string") {
      setFormInputs((prev) => ({ ...prev, [nameOrEvent]: value }));
    } else {
      const { name, value: eventValue } = nameOrEvent.target;
      setFormInputs((prev) => ({ ...prev, [name]: eventValue }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name;

    const setImageFlag = (
      field: keyof Pick<
        CheckInImageFields,
        "idImage" | "insuranceImageFront" | "insuranceImageBack"
      >,
      fileState: File | null,
      setter: (f: File | null) => void,
    ) => {
      setter(fileState);
      setFormInputs((prev) => ({ ...prev, [field]: fileState !== null }));
    };

    if (
      file &&
      file.type.startsWith("image/") &&
      !file.name.toLowerCase().endsWith(".heic")
    ) {
      if (name === "idUpload" && enableIdUpload) {
        setImageFlag("idImage", file, setIdImageFile);
      } else if (name === "insuranceFrontUpload") {
        setImageFlag(
          "insuranceImageFront",
          file,
          setInsuranceImageFrontFile,
        );
      } else if (name === "insuranceBackUpload") {
        setImageFlag("insuranceImageBack", file, setInsuranceImageBackFile);
      }
    } else {
      if (name === "idUpload" && enableIdUpload) {
        setImageFlag("idImage", null, setIdImageFile);
      } else if (name === "insuranceFrontUpload") {
        setImageFlag("insuranceImageFront", null, setInsuranceImageFrontFile);
      } else if (name === "insuranceBackUpload") {
        setImageFlag("insuranceImageBack", null, setInsuranceImageBackFile);
      }
      alert("Please select a valid image file. HEIC files are not supported.");
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        const apiBody = transformBeforeSubmit(formInputs, {
          tempPreferredPharmacy,
        });
        const { id } = await postCheckIn(apiBody);

        if (enableIdUpload && idImageFile) {
          try {
            await uploadImageToS3(idImageFile, `id/checkin-${id}`);
          } catch (error) {
            await patchCheckIn(id, "idImage");
            setFormInputs((prev) => ({ ...prev, idImage: false }));
            await postLog({
              type: "error",
              context: `${logContextPrefix}:handleSubmit:idImageFile`,
              message: error instanceof Error ? error.message : String(error),
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
            setFormInputs((prev) => ({
              ...prev,
              insuranceImageFront: false,
            }));
            await postLog({
              type: "error",
              context: `${logContextPrefix}:handleSubmit:insuranceImageFrontFile`,
              message: error instanceof Error ? error.message : String(error),
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
            setFormInputs((prev) => ({
              ...prev,
              insuranceImageBack: false,
            }));
            await postLog({
              type: "error",
              context: `${logContextPrefix}:handleSubmit:insuranceImageBackFile`,
              message: error instanceof Error ? error.message : String(error),
            });
          }
        }

        sessionStorage.setItem(sessionStorageKey, JSON.stringify(formInputs));
        sessionStorage.setItem(
          "checkInFormVariant",
          enableIdUpload ? "new" : "returning",
        );
        router.push(successPath);
      } catch {
        setIsSubmitting(false);
      }
    },
    [
      formInputs,
      transformBeforeSubmit,
      enableIdUpload,
      idImageFile,
      insuranceImageFrontFile,
      insuranceImageBackFile,
      isSubmitting,
      logContextPrefix,
      router,
      sessionStorageKey,
      successPath,
      tempPreferredPharmacy,
    ],
  );

  return {
    formInputs,
    setFormInputs,
    handleChange,
    handleFileChange,
    handleSubmit,
    agreedToTerms,
    setAgreedToTerms,
    isFormValid,
    isSubmitting,
    tempPreferredPharmacy,
    setTempPreferredPharmacy,
  };
}

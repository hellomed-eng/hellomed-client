import { CheckInFormType } from "@/lib/types/check-in";
import { formatCheckInFormTypeLabel } from "@/lib/features/check-in-admin";

type CheckInTypeBadgeProps = {
  formType: CheckInFormType;
};

export function CheckInTypeBadge({ formType }: CheckInTypeBadgeProps) {
  const isReturning = formType === "returning";
  return (
    <span
      className={
        isReturning
          ? "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
          : "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800"
      }
    >
      {formatCheckInFormTypeLabel(formType)}
    </span>
  );
}

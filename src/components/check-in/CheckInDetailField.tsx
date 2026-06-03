type CheckInDetailFieldProps = {
  label: string;
  value: string | null | undefined;
  emptyLabel?: string;
  className?: string;
};

export function CheckInDetailField({
  label,
  value,
  emptyLabel = "—",
  className,
}: CheckInDetailFieldProps) {
  const display =
    value === null || value === undefined || String(value).trim() === ""
      ? emptyLabel
      : String(value);

  return (
    <div className={className}>
      <dt className="font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap">{display}</dd>
    </div>
  );
}

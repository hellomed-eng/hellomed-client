"use client";

import { useEffect, useState } from "react";
import { isAfter, isBefore, differenceInDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { getLocationsInfo } from "@/apis/locations";
import { LocationInfo } from "@/lib/types/locations";
import { formatDate } from "@/lib/features/utils";

const DAYS: { key: keyof LocationInfo; label: string }[] = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

type HolidayState = "none" | "upcoming" | "ongoing";

function getHolidayState(start: string, end: string): HolidayState {
  if (!start || !end) return "none";
  const now = toZonedTime(new Date(), "America/New_York");
  const startDate = toZonedTime(new Date(start), "America/New_York");
  const endDate = toZonedTime(new Date(end), "America/New_York");
  if (isBefore(startDate, now) && isAfter(endDate, now)) return "ongoing";
  if (isAfter(startDate, now) && differenceInDays(startDate, now) <= 7) {
    return "upcoming";
  }
  return "none";
}

function findLocation(
  locations: LocationInfo[],
  keywords: string[]
): LocationInfo | undefined {
  return locations.find((location) => {
    const haystack = `${location.code} ${location.title}`.toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

interface ClinicHoursProps {
  hoursMatch: string[];
  phoneDisplay: string;
  phoneE164: string;
}

/**
 * Live hours for a single clinic, read from the same locations API the
 * homepage hours table and the admin "Change hours" page use.
 */
export default function ClinicHours({
  hoursMatch,
  phoneDisplay,
  phoneE164,
}: ClinicHoursProps) {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  const matchKey = hoursMatch.join(",");

  useEffect(() => {
    let cancelled = false;
    getLocationsInfo()
      .then((locations) => {
        if (cancelled) return;
        const match = findLocation(locations, matchKey.split(","));
        setLocation(match ?? null);
        setStatus(match ? "ready" : "error");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [matchKey]);

  if (status === "loading") {
    return <p className="text-gray-500">Loading today&apos;s hours…</p>;
  }

  if (status === "error" || !location) {
    return (
      <p className="text-gray-700">
        Hours are temporarily unavailable. Please call{" "}
        <a href={`tel:${phoneE164}`} className="font-semibold text-hmblue underline">
          {phoneDisplay}
        </a>{" "}
        before your visit.
      </p>
    );
  }

  if (!location.open) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-800">
        <p className="font-bold">Temporarily closed</p>
        <p>Please visit one of our other clinics.</p>
      </div>
    );
  }

  const holiday = getHolidayState(location.holiday_start, location.holiday_end);
  const todayIndex = (toZonedTime(new Date(), "America/New_York").getDay() + 6) % 7;

  return (
    <div>
      {holiday !== "none" && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-800">
          <p className="font-bold">
            {holiday === "ongoing" ? "Closed for the holiday" : "Upcoming holiday"}
          </p>
          <p>
            {formatDate(location.holiday_start, "MMM dd yyyy")} –{" "}
            {formatDate(location.holiday_end, "MMM dd yyyy")}
          </p>
          {location.holiday_message && (
            <p className="mt-2">{location.holiday_message}</p>
          )}
        </div>
      )}
      {holiday !== "ongoing" && (
        <table className="w-full text-left">
          <tbody>
            {DAYS.map(({ key, label }, index) => {
              const hours = location[key] as string;
              const isToday = index === todayIndex;
              return (
                <tr
                  key={key}
                  className={`border-b border-gray-100 ${
                    isToday ? "bg-hmpink font-bold" : ""
                  }`}
                >
                  <th scope="row" className="py-2 pr-4 font-medium">
                    {label}
                    {isToday && (
                      <span className="ml-2 text-xs font-semibold uppercase text-hmred">
                        Today
                      </span>
                    )}
                  </th>
                  <td className="py-2 text-right">{hours || "Closed"}</td>
                </tr>
              );
            })}
            {location.lunch_break && (
              <tr>
                <th scope="row" className="py-2 pr-4 font-medium text-gray-600">
                  Lunch break
                </th>
                <td className="py-2 text-right text-gray-600">
                  {location.lunch_break}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

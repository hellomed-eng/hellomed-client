"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCheckIns } from "@/apis/check-in";
import { Button } from "@/ui/external/button";
import { Card, CardContent } from "@/ui/external/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/external/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/ui/external/pagination";
import { CheckInFromBoardOutputs } from "@/lib/types/check-in";
import { formatDate } from "@/lib/features/utils";
import {
  resolveCheckInFormType,
  formatSubmittedAt,
  formatSubmittedAtExact,
} from "@/lib/features/check-in-admin";
import { CheckInTypeBadge } from "@/components/check-in/CheckInTypeBadge";
import useCheckInListUpdaterSocket from "@/lib/hooks/socket";

export default function CheckInView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [checkIns, setCheckIns] = useState<CheckInFromBoardOutputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const pageSize = 15;
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const totalPages = checkIns
    ? Math.floor(checkIns.totalCheckIns / pageSize)
    : 0;

  useEffect(() => {
    const interval = setInterval(() => setNowMs(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const fetchCheckIns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCheckIns({ size: pageSize, page: currentPage });
      setCheckIns(data);
    } catch (err) {
      setError("Failed to fetch check-ins. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchCheckIns();
  }, [fetchCheckIns]);

  useCheckInListUpdaterSocket(setCheckIns, currentPage);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/admin/check-in-view?${params.toString()}`);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">View check-ins</h2>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">Type</TableHead>
                <TableHead className="w-1/12">Name</TableHead>
                <TableHead className="w-1/12">Birth Date</TableHead>
                <TableHead className="w-1/12">Submitted</TableHead>
                <TableHead className="w-2/12">Reason for Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkIns?.checkIns.map((checkIn) => {
                const formType = resolveCheckInFormType(checkIn);
                const submittedLabel = formatSubmittedAt(
                  checkIn.created_at,
                  nowMs,
                );
                const submittedExact = formatSubmittedAtExact(
                  checkIn.created_at,
                );
                const showSubmittedTooltip =
                  submittedLabel !== submittedExact;

                return (
                  <TableRow
                    key={checkIn.id}
                    className={`group cursor-pointer ${!checkIn.viewed ? "font-bold" : ""}`}
                    onClick={() =>
                      router.push(`/admin/check-in-view/${checkIn.id}`)
                    }
                  >
                    <TableCell className="group-hover:bg-gray-100">
                      <CheckInTypeBadge formType={formType} />
                    </TableCell>
                    <TableCell className="group-hover:bg-gray-100 truncate max-w-0">
                      <span className="block truncate">{checkIn.name}</span>
                    </TableCell>
                    <TableCell className="group-hover:bg-gray-100 truncate max-w-0">
                      <span className="block truncate">
                        {formatDate(checkIn.birthDate, "MM/dd/yyyy", "UTC")}
                      </span>
                    </TableCell>
                    <TableCell className="group-hover:bg-gray-100 truncate max-w-0">
                      <span
                        className="block truncate"
                        title={
                          showSubmittedTooltip ? submittedExact : undefined
                        }
                      >
                        {submittedLabel}
                      </span>
                    </TableCell>
                    <TableCell className="group-hover:bg-gray-100 truncate max-w-0">
                      <span
                        className="block truncate"
                        title={checkIn.reasonForVisit}
                      >
                        {checkIn.reasonForVisit}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={() => updatePage(0)}
              disabled={currentPage === 0}
              variant="outline"
            >
              First
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() => updatePage(currentPage - 1)}
              disabled={currentPage === 0}
              variant="outline"
            >
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage + 1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() => updatePage(currentPage + 1)}
              disabled={
                checkIns === undefined
                  ? true
                  : checkIns.checkIns.length < pageSize
              }
              variant="outline"
            >
              Next
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() => updatePage(totalPages)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Last
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

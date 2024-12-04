"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDays,
  endOfWeek,
  format,
  isWithinInterval,
  startOfWeek,
  subDays,
  toDate,
} from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { cn, getDateRange } from "@/lib/utils";

interface WeekSelectorProps {
  defaultFrom: string;
  defaultTo: string;
}

export const WeekSelector = ({ defaultFrom, defaultTo }: WeekSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [dateRange, setDateRange] = useState({
    from: defaultFrom,
    to: defaultTo,
  });

  const nextWeek = () => {
    const next = addDays(dateRange.from, 7);
    const { from, to } = getDateRange(next);
    setDateRange({ to, from });
  };
  const prevWeek = () => {
    const prev = subDays(dateRange.from, 7);
    const { from, to } = getDateRange(prev);
    setDateRange({ to, from });
  };

  const currentPeriod = useMemo(() => {
    return isWithinInterval(new Date(), {
      start: toDate(dateRange.from),
      end: toDate(dateRange.to),
    });
  }, [dateRange]);

  const dateRangeString = useMemo(() => {
    if (!dateRange.to || !dateRange.from) return "Loading";
    const fromDate = toDate(dateRange.from);
    const endDate = toDate(dateRange.to);
    return `${format(fromDate, "do LLL")} - ${format(endDate, "do LLL")}`;
  }, [dateRange.from, dateRange.to]);

  useEffect(() => {
    const setDateRangeSearchParams = setTimeout(() => {
      const params = new URLSearchParams({
        from: dateRange.from,
        to: dateRange.to,
      });
      router.push(pathname + "?" + params.toString());
    }, 500);
    return () => clearTimeout(setDateRangeSearchParams);
  }, [dateRange, pathname, router]);

  return (
    <div className="flex justify-between items-center border rounded-md">
      <Button variant={"ghost"} size={"icon"} onClick={prevWeek}>
        <ChevronLeft />
      </Button>
      <p
        className={cn(
          "text-lg",
          currentPeriod? "text-neutral-800 font-bold": "font-semibold"
        )}
      >
        {currentPeriod?"This week":dateRangeString}
      </p>
      <Button variant={"ghost"} size={"icon"} onClick={nextWeek}>
        <ChevronRight />
      </Button>
    </div>
  );
};

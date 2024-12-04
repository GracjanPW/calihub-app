"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter, SkipBackIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { addDays, format, isWithinInterval, subDays, toDate } from "date-fns";
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

  const currentWeek = () => {
    setDateRange(getDateRange(new Date()));
  };

  const currentPeriod = useMemo(() => {
    return isWithinInterval(new Date(), {
      start: toDate(dateRange.from),
      end: addDays(toDate(dateRange.to), 1),
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
    <div className="flex justify-center space-x-2">
      <Button
        disabled={
          !(
            new Date() < toDate(dateRange.from) ||
            new Date() > toDate(dateRange.to)
          )
        }
        onClick={currentWeek}
        variant={"outline"}
        size={"icon"}
      >
        <SkipBackIcon />
      </Button>

      <div className="flex-1 flex justify-between items-center border rounded-md">
        <Button variant={"ghost"} size={"icon"} onClick={prevWeek}>
          <ChevronLeft />
        </Button>
        <p
          className={cn(
            "text-lg",
            currentPeriod ? "text-neutral-800 font-bold" : "font-semibold"
          )}
        >
          {currentPeriod ? "This week" : dateRangeString}
        </p>
        <Button variant={"ghost"} size={"icon"} onClick={nextWeek}>
          <ChevronRight />
        </Button>
      </div>
      <Button variant={"outline"} size={"icon"} disabled={false}>
        <Filter />
      </Button>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDays,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  toDate,
} from "date-fns";
import { usePathname, useRouter } from "next/navigation";

interface WeekSelectorProps {
  defaultFrom: string;
  defaultTo: string;
}

export const WeekSelector = ({
  defaultFrom,
  defaultTo,
}: WeekSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [dateRange, setDateRange] = useState({
    from: defaultFrom,
    to: defaultTo,
  });

  const getDateRange = (date: Date) => {
    const from = startOfWeek(date, {
      weekStartsOn: 1,
    }).toDateString();
    const to = endOfWeek(date,{
      weekStartsOn:1
    }).toDateString();
    return {
      from,
      to,
    };
  };

  const setNewDateRange = useCallback(
    (day: Date) => {
      const { from, to } = getDateRange(day);
      setDateRange({ to, from });
      const params = new URLSearchParams({
        from,
        to,
      });
      router.push(pathname + "?" + params.toString());
    },
    [router, pathname]
  );

  const nextWeek = () => {
    const next = addDays(dateRange.from, 7);
    setNewDateRange(next);
  };
  const prevWeek = () => {
    const prev = subDays(dateRange.from, 7);
    setNewDateRange(prev);
  };

  const currentPeriod = useMemo(() => {
    if (!dateRange.to || !dateRange.from) return "Loading";
    const fromDate = toDate(dateRange.from);
    const endDate = toDate(dateRange.to);
    return `${format(fromDate, "do LLL")} - ${format(endDate, "do LLL")}`;
  }, [dateRange.from, dateRange.to]);

  useEffect(() => {
    if (!dateRange.to || !dateRange.from) {
      const today = new Date()
      setNewDateRange(today);
    }
  }, [dateRange.from, dateRange.to, setNewDateRange]);

  return (
    <div className="flex justify-between items-center border rounded-md">
      <Button variant={"ghost"} size={"icon"} onClick={prevWeek}>
        <ChevronLeft/>
      </Button>
      <p className="text-lg font-semibold">{currentPeriod}</p>
      <Button variant={"ghost"} size={"icon"} onClick={nextWeek}>
        <ChevronRight />
      </Button>
    </div>
  );
};

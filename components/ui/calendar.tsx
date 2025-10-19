import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CalendarMode = "single" | "multiple" | "range";

type DateRange = {
  from?: Date;
  to?: Date;
};

type CalendarSelection = Date | Date[] | DateRange | undefined;

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  mode?: CalendarMode;
  selected?: CalendarSelection;
  onSelect?: (value: CalendarSelection) => void;
  initialMonth?: Date;
  showOutsideDays?: boolean;
  disabled?: (date: Date) => boolean;
}

const weekdayFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" });

const normalizeMonth = (mode: CalendarMode, selected: CalendarSelection, initialMonth?: Date) => {
  if (initialMonth) return startOfMonth(initialMonth);

  if (mode === "single" && selected instanceof Date) {
    return startOfMonth(selected);
  }

  if (mode === "multiple" && Array.isArray(selected) && selected.length > 0) {
    return startOfMonth(selected[0]);
  }

  if (mode === "range" && selected && !Array.isArray(selected)) {
    const range = selected as DateRange;
    if (range.from) return startOfMonth(range.from);
    if (range.to) return startOfMonth(range.to);
  }

  return startOfMonth(new Date());
};

const buildCalendarMatrix = (month: Date) => {
  const start = startOfWeek(startOfMonth(month));
  const end = endOfWeek(endOfMonth(month));
  const days = eachDayOfInterval({ start, end });

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};

const isWithinRange = (date: Date, range: DateRange | undefined) => {
  if (!range?.from || !range?.to) return false;
  const start = range.from <= range.to ? range.from : range.to;
  const end = range.to >= range.from ? range.to : range.from;
  return (isAfter(date, start) || isSameDay(date, start)) && (isBefore(date, end) || isSameDay(date, end));
};

const toggleMultiple = (current: Date[] | undefined, day: Date) => {
  if (!current) return [day];
  const exists = current.some((value) => isSameDay(value, day));
  if (exists) {
    return current.filter((value) => !isSameDay(value, day));
  }
  return [...current, day];
};

const updateRange = (current: DateRange | undefined, day: Date): DateRange => {
  if (!current?.from || (current.from && current.to)) {
    return { from: day, to: undefined };
  }

  if (isBefore(day, current.from)) {
    return { from: day, to: current.from };
  }

  if (isSameDay(day, current.from)) {
    return { from: current.from, to: current.from };
  }

  return { from: current.from, to: day };
};

const getDayState = (
  day: Date,
  mode: CalendarMode,
  selected: CalendarSelection,
): {
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
} => {
  if (mode === "multiple" && Array.isArray(selected)) {
    const match = selected.some((value) => isSameDay(value, day));
    return { isSelected: match, isRangeStart: false, isRangeEnd: false, isInRange: false };
  }

  if (mode === "range" && selected && !Array.isArray(selected)) {
    const range = selected as DateRange;
    const isStart = range.from ? isSameDay(range.from, day) : false;
    const isEnd = range.to ? isSameDay(range.to, day) : false;
    return {
      isSelected: isStart || isEnd,
      isRangeStart: Boolean(isStart),
      isRangeEnd: Boolean(isEnd),
      isInRange: isWithinRange(day, range) && !isStart && !isEnd,
    };
  }

  if (mode === "single" && selected instanceof Date) {
    return {
      isSelected: isSameDay(selected, day),
      isRangeStart: false,
      isRangeEnd: false,
      isInRange: false,
    };
  }

  return { isSelected: false, isRangeStart: false, isRangeEnd: false, isInRange: false };
};

function Calendar({
  className,
  mode = "single",
  selected,
  onSelect,
  initialMonth,
  showOutsideDays = true,
  disabled,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => normalizeMonth(mode, selected, initialMonth));

  React.useEffect(() => {
    setCurrentMonth(normalizeMonth(mode, selected, initialMonth));
  }, [mode, selected, initialMonth]);

  const weeks = React.useMemo(() => buildCalendarMatrix(currentMonth), [currentMonth]);

  const handleDaySelection = (day: Date) => {
    if (disabled?.(day)) return;

    if (mode === "multiple") {
      const nextValue = toggleMultiple(Array.isArray(selected) ? selected : undefined, day);
      onSelect?.(nextValue);
      return;
    }

    if (mode === "range") {
      const rangeValue = !Array.isArray(selected) ? (selected as DateRange | undefined) : undefined;
      const nextRange = updateRange(rangeValue, day);
      onSelect?.(nextRange);
      return;
    }

    const nextSingle = selected instanceof Date && isSameDay(selected, day) ? undefined : day;
    onSelect?.(nextSingle);
  };

  const heading = format(currentMonth, "MMMM yyyy");

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          )}
          onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </button>
        <div className="text-sm font-medium">{heading}</div>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          )}
          onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex">
          {weeks[0]?.map((day) => (
            <div key={`weekday-${day.toISOString()}`} className="text-muted-foreground w-9 text-center text-[0.8rem] font-normal">
              {weekdayFormat.format(day)}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="mt-2 flex w-full">
            {week.map((day) => {
              const outside = !isSameMonth(day, currentMonth);
              if (!showOutsideDays && outside) {
                return <div key={day.toISOString()} className="h-9 w-9" aria-hidden />;
              }

              const isDisabled = disabled?.(day) ?? false;
              const { isSelected, isRangeStart, isRangeEnd, isInRange } = getDayState(day, mode, selected);
              const today = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDaySelection(day)}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "relative h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                    outside && "text-muted-foreground opacity-50",
                    isDisabled && "pointer-events-none text-muted-foreground opacity-50",
                    today && !isSelected && !isInRange && "bg-accent text-accent-foreground",
                    (isSelected || isInRange) && "bg-accent text-accent-foreground",
                    isSelected &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    isRangeStart && "rounded-l-md",
                    isRangeEnd && "rounded-r-md",
                    isInRange && !isRangeStart && !isRangeEnd && "rounded-none",
                  )}
                  aria-pressed={isSelected || isInRange}
                  aria-current={today ? "date" : undefined}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

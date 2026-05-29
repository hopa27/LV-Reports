import { useEffect, useRef, useState } from "react";
import {
  format,
  parse,
  isValid,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameDay,
  isSameMonth,
} from "date-fns";
import { MdKeyboardArrowDown, MdChevronLeft, MdChevronRight } from "react-icons/md";

interface DatePickerProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (d: Date | null) => void;
}

function parseValue(value: string): Date | null {
  if (!value) return null;
  const d = parse(value, "dd/MM/yyyy", new Date());
  return isValid(d) ? d : null;
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function DatePicker({ value, placeholder, disabled, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = parseValue(value);
  const [viewMonth, setViewMonth] = useState<Date>(selected ?? new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && selected) {
      setViewMonth(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const today = new Date();

  const gridStart = startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 });
  const gridEnd = endOfWeek(endOfMonth(viewMonth), { weekStartsOn: 1 });
  const days: Date[] = [];
  let cur = gridStart;
  while (cur <= gridEnd) {
    days.push(cur);
    cur = addDays(cur, 1);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`lve-input pr-12 text-left flex items-center ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span className={`truncate ${value ? "text-[#3d3d3d]" : "text-[#9a9a9a]"}`}>
          {value || placeholder || ""}
        </span>
        <span className="pointer-events-none absolute right-0 top-0 h-full flex items-center">
          <span className="h-[20px] w-px bg-[#BBBBBB]" />
          <MdKeyboardArrowDown size={22} className="text-[#006cf4] mx-1.5" />
        </span>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full mt-1 z-30 w-[260px] bg-white border border-[#BBBBBB] rounded-[8px] shadow-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#eaf5f8] text-[#006cf4] cursor-pointer"
            >
              <MdChevronLeft size={20} />
            </button>
            <span className="font-['Livvic'] font-semibold text-[14px] text-[#0d2c41]">
              {format(viewMonth, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#eaf5f8] text-[#006cf4] cursor-pointer"
            >
              <MdChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-1 mb-1">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="text-center font-['Livvic'] font-semibold text-[11px] text-[#0d2c41]"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {days.map((d) => {
              const isSelected = selected && isSameDay(d, selected);
              const isToday = isSameDay(d, today);
              const inMonth = isSameMonth(d, viewMonth);
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => {
                    onChange(d);
                    setOpen(false);
                  }}
                  className={`mx-auto w-8 h-8 flex items-center justify-center text-[13px] font-['Mulish'] cursor-pointer rounded-full
                    ${isSelected ? "bg-[#006cf4] text-white" : isToday ? "border border-[#006cf4]" : "hover:bg-[#eaf5f8]"}
                    ${!inMonth && !isSelected ? "text-[#bbbbbb]" : "text-[#3d3d3d]"}
                    ${isSelected ? "text-white" : ""}
                  `}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

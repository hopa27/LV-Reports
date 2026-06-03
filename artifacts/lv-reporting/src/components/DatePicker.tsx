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
import { MdOutlineCalendarToday, MdChevronLeft, MdChevronRight } from "react-icons/md";

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
        } ${open && !disabled ? "border-[2px] border-[#178830]" : ""}`}
      >
        <span className={`truncate ${value ? "text-[#3d3d3d]" : "text-[#BBBBBB]"}`}>
          {value || placeholder || ""}
        </span>
        <span className="pointer-events-none absolute right-0 top-0 h-full flex items-center">
          <span className="h-[20px] w-px bg-[#BBBBBB]" />
          <MdOutlineCalendarToday size={18} className="text-[#006cf4] mx-2.5" />
        </span>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full mt-1 z-30 w-[280px] bg-white border-[2px] border-[#178830] rounded-[12px] overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-3 py-2">
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#005a9c] hover:text-[#003578] cursor-pointer"
            >
              <MdChevronLeft size={20} />
            </button>
            <span className="font-['Livvic'] font-bold text-[16px] text-[#005a9c]">
              {format(viewMonth, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full text-[#005a9c] hover:text-[#003578] cursor-pointer"
            >
              <MdChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 bg-[#eef4f8]">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="text-center font-['Livvic'] font-semibold text-[12px] text-[#002f5c] py-1.5"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 p-2">
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
                  className={`mx-auto w-9 h-9 flex items-center justify-center text-[14px] font-['Mulish'] cursor-pointer rounded-full
                    ${
                      isSelected
                        ? "bg-[#006cf4] text-white hover:bg-[#003578]"
                        : isToday
                          ? "text-[#006cf4] font-semibold hover:bg-[#003578] hover:text-white"
                          : "text-[#3d3d3d] hover:bg-[#003578] hover:text-white"
                    }
                    ${!inMonth && !isSelected ? "lve-hatch opacity-50" : ""}
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

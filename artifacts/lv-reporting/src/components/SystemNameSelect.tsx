import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

interface SystemNameSelectProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export default function SystemNameSelect({ value, options, onChange }: SystemNameSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`lve-input pr-12 text-left flex items-center cursor-pointer ${
          open ? "border-[3px] border-[#178830] border-b-0 rounded-b-none px-[10px]" : ""
        }`}
      >
        <span className="truncate">{value}</span>
        <span className="pointer-events-none absolute right-0 top-0 h-full flex items-center">
          <span className="h-[20px] w-px bg-[#BBBBBB]" />
          <MdKeyboardArrowDown
            size={22}
            className={`text-[#006cf4] mx-1.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div className="lve-scroll absolute left-0 top-full z-30 w-full max-h-[200px] overflow-auto bg-white border-[3px] border-t-0 border-[#178830] rounded-b-[8px] shadow-lg font-['Mulish'] text-[16px] text-[#3d3d3d]">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex items-center justify-between gap-2 px-3 py-3 cursor-pointer ${
                  isSelected
                    ? "bg-[#05579B] text-white"
                    : "hover:bg-[#05579B] hover:text-white"
                }`}
              >
                <span className="truncate">{opt}</span>
                {isSelected && <MdCheck size={18} className="shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

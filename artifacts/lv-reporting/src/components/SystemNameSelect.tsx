import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

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
        className="lve-input pr-12 text-left flex items-center cursor-pointer"
      >
        <span className="truncate">{value}</span>
        <span className="pointer-events-none absolute right-0 top-0 h-full flex items-center">
          <span className="h-[20px] w-px bg-[#BBBBBB]" />
          <MdKeyboardArrowDown size={22} className="text-[#006cf4] mx-1.5" />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-30 w-full max-h-[180px] overflow-auto bg-white border border-[#BBBBBB] rounded-[8px] shadow-lg font-['Mulish'] text-[14px] text-[#3d3d3d]">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-3 py-1.5 cursor-pointer ${
                  isSelected ? "bg-[#006cf4] text-white" : "hover:bg-[#eaf5f8]"
                }`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

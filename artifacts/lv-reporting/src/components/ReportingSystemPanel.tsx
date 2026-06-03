import { useState } from "react";
import { format } from "date-fns";
import { MdPrint, MdSearch, MdError, MdCheck, MdWarning, MdClose } from "react-icons/md";
import SystemNameSelect from "./SystemNameSelect";
import DatePicker from "./DatePicker";
import {
  SYSTEM_NAMES,
  DEFAULT_SYSTEM,
  getSystemState,
  type Report,
} from "../data/reports";

type ReportingSystemPanelProps = {
  systemName: string;
  onSystemNameChange: (name: string) => void;
};

export default function ReportingSystemPanel({
  systemName,
  onSystemNameChange,
}: ReportingSystemPanelProps) {
  const initial = getSystemState(DEFAULT_SYSTEM);
  const [reports, setReports] = useState<Report[]>(initial.reports);
  const [startDate, setStartDate] = useState<string>(initial.startDate);
  const [endDate, setEndDate] = useState<string>(initial.endDate);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [defaultPrinter, setDefaultPrinter] = useState<boolean>(false);

  const [showPrintError, setShowPrintError] = useState<boolean>(false);
  const [warning, setWarning] = useState<{ open: boolean; name: string }>({
    open: false,
    name: "",
  });

  function handleSystemChange(name: string) {
    const state = getSystemState(name);
    onSystemNameChange(name);
    setReports(state.reports);
    setStartDate(state.startDate);
    setEndDate(state.endDate);
    setSelectedRow(0);
    if (state.warning) {
      setWarning({ open: true, name });
    }
  }

  const selectedReport = reports[selectedRow];
  const reportPath = selectedReport?.path ?? "";

  return (
    <div className="lve-panel bg-white w-full flex flex-col">
      {/* [B] Panel body */}
      <div className="lve-panel-body flex flex-col gap-4">
        {/* [B1+B2] Sticky top area */}
        <div className="sticky top-0 z-30 bg-white -mx-6 px-6 py-3 border-b border-slate-200 flex flex-col gap-4">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-[200px]">
              <label className="lve-label">System Name</label>
              <SystemNameSelect
                value={systemName}
                options={SYSTEM_NAMES}
                onChange={handleSystemChange}
              />
            </div>
            <div className="w-[200px]">
              <label className="lve-label">Start Date</label>
              <DatePicker
                value={startDate}
                placeholder="dd/MM/yyyy"
                onChange={(d) => setStartDate(d ? format(d, "dd/MM/yyyy") : "")}
              />
            </div>
            <div className="w-[200px]">
              <label className="lve-label">End Date</label>
              <DatePicker
                value={endDate}
                placeholder="dd/MM/yyyy"
                onChange={(d) => setEndDate(d ? format(d, "dd/MM/yyyy") : "")}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPrintError(true)}
              className="lve-btn ml-auto"
            >
              <MdPrint size={18} />
              Print
            </button>
          </div>

          {/* Default printer checkbox */}
          <label className="inline-flex items-center gap-2 font-['Mulish'] text-[14px] text-[#3d3d3d] cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={defaultPrinter}
              onChange={(e) => setDefaultPrinter(e.target.checked)}
              className="w-4 h-4 accent-[#006cf4]"
            />
            Print to my default printer
          </label>
        </div>

        {/* [B3] Reports table */}
        <div className="border-y-[3px] border-[#04589b] flex flex-col min-h-[340px]">
          <div className="grid grid-cols-[1fr_160px] font-['Livvic'] font-semibold text-[18px] text-[#002f5c] border-b-[3px] border-[#04589b] sticky top-[120px] z-20 bg-white">
            <div className="px-4 py-3">ReportName</div>
            <div className="px-4 py-3">DateRequired</div>
          </div>
          <div className="overflow-auto lve-scroll font-['Mulish'] font-light text-[16px] text-[#3d3d3d]">
            {reports.map((report, idx) => {
              const isSelected = idx === selectedRow;
              return (
                <div
                  key={`${report.name}-${idx}`}
                  onClick={() => setSelectedRow(idx)}
                  className={`grid grid-cols-[1fr_160px] cursor-pointer ${
                    isSelected
                      ? "bg-[#006cf4] text-white"
                      : `${idx % 2 === 1 ? "bg-[#e7ebec34]" : ""} hover:bg-[#05579B] hover:text-white`
                  }`}
                >
                  <div className="px-4 py-2">{report.name}</div>
                  <div className="px-4 py-2">{report.dateRequired}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* [B4] Footer row */}
        <div className="flex items-center gap-2 sticky bottom-[58px] z-30 bg-white -mx-6 px-6 py-3 border-t border-slate-200">
          <input
            type="text"
            readOnly
            value={reportPath}
            className="lve-input flex-1 bg-[#fafafa] cursor-default"
          />
          <button
            type="button"
            disabled
            className="lve-btn lve-btn-secondary"
          >
            <MdSearch size={16} />
            Find
          </button>
        </div>
      </div>

      {/* [A] Print Error popup */}
      {showPrintError && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[460px] max-w-full">
            <div className="lve-panel-header flex items-center justify-between">
              <span>{systemName} Reporting System</span>
              <button
                type="button"
                onClick={() => setShowPrintError(false)}
                className="text-white hover:text-[#d72714] cursor-pointer"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="lve-panel-body flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d72714] text-white flex items-center justify-center shrink-0">
                  <MdError size={24} />
                </div>
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-2">
                  Error:200 Formula Name could not be found - Formulas.ByName.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintError(false)}
                className="lve-btn min-w-[100px] justify-center self-end"
              >
                <MdCheck size={16} />
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* [B] Warning popup */}
      {warning.open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[460px] max-w-full">
            <div className="lve-panel-header flex items-center justify-between">
              <span>Warning</span>
              <button
                type="button"
                onClick={() => setWarning({ open: false, name: "" })}
                className="text-white hover:text-[#d72714] cursor-pointer"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="lve-panel-body flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f5a623] text-white flex items-center justify-center shrink-0">
                  <MdWarning size={24} />
                </div>
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-2">
                  System {warning.name} is not present in ORACLE database!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWarning({ open: false, name: "" })}
                className="lve-btn min-w-[100px] justify-center self-end"
              >
                <MdCheck size={16} />
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

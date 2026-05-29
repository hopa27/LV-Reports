export interface Report {
  name: string;
  dateRequired: string;
  path?: string;
}

export const SYSTEM_NAMES = [
  "CCRP",
  "CHEQUE REQUISITION",
  "DANAD96",
  "FINANCE",
  "GENERAL",
  "HIPPS97",
  "IFA SALES",
  "ILA REPORTS",
  "MARKETING",
  "MORTGAGE ANNUIT(Admin)",
  "MORTGAGE ANNUIT(NB)",
  "NUANAD",
  "PC96",
  "PLI ADMIN",
  "PROPSALE97",
  "SALES95",
] as const;

export const DEFAULT_SYSTEM = "DANAD96";
export const DEFAULT_START_DATE = "06/06/2017";
export const DEFAULT_END_DATE = "17/04/2017";

export const NOT_IN_ORACLE = new Set([
  "CCRP",
  "MARKETING",
  "PLI ADMIN",
  "SALES95",
]);

export const EMPTY_NO_WARNING = new Set([
  "HIPPS97",
  "ILA REPORTS",
  "MORTGAGE ANNUIT(Admin)",
  "MORTGAGE ANNUIT(NB)",
  "PC96",
  "PROPSALE97",
]);

const DANAD96_REPORTS: Report[] = [
  { name: "Anniversary Date Check", dateRequired: "S", path: "\\\\delphiuat\\uat\\anad96\\reports\\32setlive.rpt" },
  { name: "Annuities Time From Application To Completion", dateRequired: "B" },
  { name: "Annuity Activity Report", dateRequired: "" },
  { name: "Annuity Applications", dateRequired: "B" },
  { name: "Annuity Completions", dateRequired: "B" },
  { name: "Annuity Completions by BACS", dateRequired: "B" },
  { name: "Annuity Completions by BACS - Summary", dateRequired: "B" },
  { name: "Annuity pipeline report", dateRequired: "" },
  { name: "Annuity pipeline summary report", dateRequired: "" },
  { name: "Annuity Receipts & Tax Free Cash Report", dateRequired: "B" },
  { name: "BACS cases with blank bank details", dateRequired: "" },
  { name: "Business from IFA", dateRequired: "" },
  { name: "Commissions in and out", dateRequired: "B" },
  { name: "Death Comparison CLANAD Report", dateRequired: "" },
  { name: "Detailed Turnaround Time Annuity Quotes", dateRequired: "B" },
  { name: "Diary Report", dateRequired: "" },
  { name: "ICFP - Cancelled Policies", dateRequired: "" },
  { name: "ICFP - Hospitalised Policies", dateRequired: "" },
  { name: "IFA COMMISSION RETURN REPORT", dateRequired: "B" },
  { name: "IFA Portfolio cases", dateRequired: "B" },
  { name: "IFA Portfolio cases - For Portfolio", dateRequired: "B" },
  { name: "Monthly Premiums Allocated (Completed Cases)", dateRequired: "B" },
  { name: "Monthly Premiums allocated report", dateRequired: "B" },
  { name: "New Application Quote check report", dateRequired: "" },
  { name: "Next Payment date Check", dateRequired: "S" },
  { name: "Northern Ireland Addresses Policies for NSO", dateRequired: "" },
  { name: "NOT IN FORCE ANNUITIES", dateRequired: "S" },
  { name: "NOT IN FORCE ANNUITIES WITHOUT A NOT IN FORCE DATE", dateRequired: "S" },
  { name: "Note Log Report", dateRequired: "B" },
  { name: "Overseas Annuity Clients for Proof of Existence Check", dateRequired: "" },
  { name: "Payment Frequency and Escalation", dateRequired: "" },
  { name: "Polices Suspended", dateRequired: "" },
  { name: "Policies Due For Renewal", dateRequired: "B", path: "\\\\delphiuat\\uat\\anad96\\reports\\Renewals.rpt" },
  { name: "Premiums Unallocated Report", dateRequired: "" },
  { name: "Scottish Addresses Policies for NSO", dateRequired: "" },
  { name: "Smokers Applications", dateRequired: "B" },
  { name: "Summary Turnaround Time Annuity Quotes", dateRequired: "B" },
  { name: "Tax Code Changes Since Last Pay Date", dateRequired: "B" },
  { name: "Tax Refunds received", dateRequired: "B" },
  { name: "Withdrawals & Cancellations", dateRequired: "B", path: "\\\\delphiuat\\uat\\anad96\\reports\\Withdrawls & Cancelations.rpt" },
];

const NUANAD_REPORTS: Report[] = [
  { name: "ABI STATS", dateRequired: "B", path: "JOHNS-043" },
  { name: "ANNUITY COMPLETIONS (ADMIN PRINTER)", dateRequired: "B" },
  { name: "ANNUITY LIST (POLAD001)", dateRequired: "B" },
  { name: "BACS PAYMENTS CURRENT MONTH", dateRequired: "" },
  { name: "CHEQUE PAYMENTS CURRENT MONTH", dateRequired: "" },
  { name: "COMPLETED MAR REPORT", dateRequired: "B" },
  { name: "DEATHS & CLOSURES REPORT", dateRequired: "B" },
  { name: "DEATHS & CLOSURES REPORT (MK2)", dateRequired: "B" },
  { name: "DIARY REPORT", dateRequired: "" },
  { name: "JOURNAL LISTING", dateRequired: "" },
  { name: "NEW BUSINESS (POLAD002)", dateRequired: "B" },
  { name: "NON MONTHLY INSTALMENTS", dateRequired: "B" },
  { name: "P60 SUMMARY", dateRequired: "" },
  { name: "RENEWALS SCHEDULES (ADVANCE)", dateRequired: "B" },
  { name: "RENEWALS SCHEDULES (ARREARS)", dateRequired: "B" },
  { name: "STANDARD NON REASSURED ANNUITY PAYMENTS", dateRequired: "B" },
];

const IFA_SALES_REPORTS: Report[] = [
  { name: "ANNUITY RATE EXTRACT", dateRequired: "", path: "\\\\delphiuat\\uat\\cpa95\\reports\\extract report.rpt" },
];

const GENERAL_REPORTS: Report[] = [
  { name: "Telephone List", dateRequired: "", path: "\\\\delphiuat\\uat\\pdoxdata\\telelist.rpt" },
];

const FINANCE_REPORTS: Report[] = [
  { name: "Annuity Payment - Details", dateRequired: "B", path: "\\\\delphiuat\\uat\\accts\\reports\\AnnPay - Details(Exe).rpt" },
  { name: "Annuity Payment - Summary", dateRequired: "B" },
  { name: "Premium By Period", dateRequired: "B" },
  { name: "Seamus Report", dateRequired: "B" },
];

const CHEQUE_REQUISITION_REPORTS: Report[] = [
  { name: "CHEQUE REQUISITION LISTING", dateRequired: "", path: "\\\\delphiuat\\uat\\pdoxdata\\hipps96\\reports\\" },
];

export interface SystemConfig {
  reports: Report[];
  startDate: string;
  endDate: string;
}

export const SYSTEM_CONFIG: Record<string, SystemConfig> = {
  DANAD96: { reports: DANAD96_REPORTS, startDate: DEFAULT_START_DATE, endDate: DEFAULT_END_DATE },
  NUANAD: { reports: NUANAD_REPORTS, startDate: "25/09/2016", endDate: "29/09/2016" },
  "IFA SALES": { reports: IFA_SALES_REPORTS, startDate: "01/01/2006", endDate: "31/12/2006" },
  GENERAL: { reports: GENERAL_REPORTS, startDate: "01/07/2009", endDate: "15/07/2009" },
  FINANCE: { reports: FINANCE_REPORTS, startDate: "01/07/2011", endDate: "31/07/2015" },
  "CHEQUE REQUISITION": { reports: CHEQUE_REQUISITION_REPORTS, startDate: "01/04/2016", endDate: "21/09/2026" },
};

export function getSystemState(name: string): {
  reports: Report[];
  startDate: string;
  endDate: string;
  warning: boolean;
} {
  if (NOT_IN_ORACLE.has(name)) {
    return { reports: [], startDate: "", endDate: "", warning: true };
  }
  if (EMPTY_NO_WARNING.has(name)) {
    return { reports: [], startDate: "", endDate: "", warning: false };
  }
  const config = SYSTEM_CONFIG[name];
  if (config) {
    return { reports: config.reports, startDate: config.startDate, endDate: config.endDate, warning: false };
  }
  // Default fallback → DANAD96 list with DANAD96 dates
  return {
    reports: DANAD96_REPORTS,
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
    warning: false,
  };
}

export default function Header() {
  return (
    <header className="bg-[#00263e] text-white h-[52px] px-[142px] flex items-center justify-between shrink-0">
      <div className="font-['Livvic'] font-bold text-[24px] tracking-tight">LV=</div>
      <div className="flex items-center gap-4">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="font-['Livvic'] text-[14px] text-white hover:underline"
        >
          Logout
        </a>
        <span className="h-[20px] w-px bg-white/40" />
        <span className="font-['Livvic'] font-semibold text-[15px]">Reporting System</span>
      </div>
    </header>
  );
}

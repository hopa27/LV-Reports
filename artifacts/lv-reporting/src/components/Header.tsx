import lvLogo from "@assets/image_1780040378461.png";

export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-[#00263e] text-white h-[52px] px-[142px] flex items-center justify-between shrink-0 pt-[20px] pb-[20px]">
      <div className="flex items-center gap-4">
        <img src={lvLogo} alt="LV=" className="h-[28px] w-auto" />
        <span className="h-[20px] w-px bg-white/40" />
        <span className="font-['Livvic'] text-[30px] font-normal">{title}</span>
      </div>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="font-['Livvic'] text-[14px] text-white hover:underline"
      >
        Logout
      </a>
    </header>
  );
}

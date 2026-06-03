import lvLogo from "@assets/image_1780040378461.png";

export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-[#00263e] text-white px-[142px] py-5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <img src={lvLogo} alt="LV=" className="h-6 w-auto" />
        <span className="h-[20px] w-px bg-white/40" />
        <span className="font-['Livvic'] text-3xl font-normal">{title}</span>
      </div>
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="font-['Livvic'] text-[14px] text-white h-8 px-4 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}

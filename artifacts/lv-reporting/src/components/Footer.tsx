import lvLogo from "@assets/image_1780040378461.png";

export default function Footer() {
  return (
    <footer className="bg-white px-[142px] py-4 flex items-center justify-between mt-auto border-t border-slate-200 shrink-0">
      <img src={lvLogo} alt="LV=" className="h-6 w-auto" />
      <div className="text-right font-['Mulish'] text-[10px] font-medium text-slate-400 leading-tight">
        <div>County Gates, Bournemouth</div>
        <div>BH1 2NF</div>
      </div>
    </footer>
  );
}

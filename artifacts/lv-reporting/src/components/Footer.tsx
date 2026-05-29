import lvLogo from "@assets/image_1780040378461.png";

export default function Footer() {
  return (
    <footer className="bg-white h-[44px] px-[142px] flex items-center gap-3 mt-auto border-t border-[#e3e6ea] shrink-0">
      <img src={lvLogo} alt="LV=" className="h-[22px] w-auto" />
      <span className="font-['Mulish'] text-[13px] text-[#3d3d3d]">
        County Gates, Bournemouth, BH1 2NF
      </span>
    </footer>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-black">
      <div className="w-screen overflow-hidden pt-10 pb-2">
        <div>
            <div className="flex flex-row justify-between sm:justify-center sm:gap-20 text-sm sm:text-xl text-white font-extralight px-8">
                <a href="/" className="cursor-pointer" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/" } })); }}>Home</a>
                <a href="/about" className="cursor-pointer" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/about" } })); }}>About</a>
                <a href="/event" className="cursor-pointer" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/event" } })); }}>Event</a>
                <a href="#" className="cursor-pointer">Contact</a>
            </div>
            <div className="flex justify-center gap-8 pt-5">
                <div className="flex flex-row justify-center gap-8">
                    <a href="https://www.linkedin.com/company/magn-hetic/"><img src="./logo/linkedin_logo.svg" /></a>
                    <a href="https://www.tiktok.com/@magnhetic1"><img src="./logo/tiktok_logo.svg" /></a>
                    <a href="https://www.instagram.com/magnhetic/"><img src="./logo/instagram_logo.svg" /></a>
                </div>
                <div>
                    <div className="flex flex-row gap-2">
                        <img src="./icons/location.svg" />
                        <h5 className="text-[10px] text-white font-light">27 Bis Rue du Progrès, 93100 Montreuil</h5>
                    </div>
                    <div className="flex flex-row gap-2">
                        <img src="./icons/mail.svg" />
                        <h5 className="text-[10px] text-white font-light">Contact@magnhetic.com</h5>
                    </div>
                </div>
            </div>
            <h3 className="flex justify-center text-[8px] sm:text-sm text-white font-extralight pt-5">Copyright ❘ Designed by Noa Miramont, Magn'Hetic</h3>
        </div>
         <h1 className="RedHat select-none font-bold uppercase leading-none text-center pt-10 pr-4 m-0 pb-0">
          <span
            className="block sm:hidden bg-clip-text text-transparent bg-gradient-to-br from-[#98D8EF] via-[#98D8EF] to-[#CBEBE9] tracking-tight select-none"
            style={{ lineHeight: 0.75, fontSize: "54.75vw", whiteSpace: "nowrap" }}
          >
            M'H
          </span>
          <span
            className="hidden sm:block bg-clip-text text-transparent bg-gradient-to-br from-[#98D8EF] via-[#98D8EF] to-[#CBEBE9] tracking-tight select-none"
            style={{ lineHeight: 0.75, fontSize: "15.75vw", whiteSpace: "nowrap" }}
          >
            Magn'hetic
          </span>
        </h1>
      </div>
    </footer>
  )
}
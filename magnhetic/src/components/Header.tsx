"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

const Header = () => {
  const [open, setOpen] = useState(false)
  const [animating, setAnimating] = useState<'in' | 'out' | null>(null)
  const router = useRouter()

  return (
    <header className="flex flex-row fixed justify-between items-center w-full z-10 p-5">

        <a href="/" onClick={(e) => {
          e.preventDefault()
          window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/" } }))
        }}><img src="/logo/MH_logo.svg" className='h-[80px]'/></a>

        <button onClick={() => {
            if (open) {
              setAnimating('out')
              setTimeout(() => { setOpen(false); setAnimating(null) }, 400)
            } else {
              setOpen(true)
              setAnimating('in')
              setTimeout(() => setAnimating(null), 400)
            }
          }} className="flex flex-col gap-[8px] items-end cursor-pointer text-white transition-colors duration-500 px-7 py-5 z-100 group">
            <div className={`h-[1.5px] w-[40px] bg-black rounded-full transition-all duration-300 group-hover:w-[40px] origin-right ${open ? 'rotate-45 translate-y-[12px] w-[40px]' : ''}`}></div>
            <div className={`h-[1.5px] w-[30px] bg-black rounded-full transition-all duration-300 group-hover:w-[40px] origin-right ${open ? '-rotate-45 -translate-y-[25px] w-[40px]' : ''}`}></div>
        </button>
        {open && (
          <div className="fixed inset-0 z-10" aria-modal="true" role="dialog">
            {/* Backdrop clickable */}
            <button aria-label="Fermer la navigation" onClick={() => {
              setAnimating('out')
              setTimeout(() => { setOpen(false); setAnimating(null) }, 400)
            }} className={`absolute inset-0 bg-black/40 ${animating === 'out' ? 'animate-[fadeOut_.4s_ease-out_forwards]' : 'animate-[fadeIn_.4s_ease-out_forwards]'}`} />
            {/* Panel */}
            <div className={`absolute right-0 top-0 h-full w-[80vw] md:w-[420px] bg-white/95 backdrop-blur-sm translate-x-0 ${animating === 'out' ? 'animate-[slideOut_.4s_ease-in_forwards]' : 'animate-[slideIn_.5s_ease-out_forwards]'} shadow-[0_0_0_0_rgba(0,0,0,0)]`}>
            <nav className="h-full flex flex-col justify-center items-end pr-16 gap-10">
              <a className="text-3xl font-bold" href="/" onClick={(e) => {
                e.preventDefault(); window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/" } }));
                setAnimating('out'); setTimeout(() => { setOpen(false); setAnimating(null) }, 400)
              }}>ACCUEIL</a>
              <a className="text-3xl font-bold" href="/about" onClick={(e) => {
                e.preventDefault(); window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/about" } }));
                setAnimating('out'); setTimeout(() => { setOpen(false); setAnimating(null) }, 400)
              }}>L’ASSOCIATION</a>
              <a className="text-3xl font-bold" href="/event" onClick={(e) => {
                e.preventDefault(); window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href: "/event" } }));
                setAnimating('out'); setTimeout(() => { setOpen(false); setAnimating(null) }, 400)
              }}>NOS ÉVÉNEMENTS</a>
              <a className="text-3xl font-bold" href="#">RECRUTEMENT</a>
              <a className="text-3xl font-bold" href="#">CONTACT</a>
              <div className="mt-8 text-right text-sm">
                <p>27 Bis Rue du Progrès<br/>93100 Montreuil<br/>France</p>
                <p className="mt-2 underline">Contact@magnhetic.com</p>
                <div className="flex justify-end gap-4 mt-4">
                  <a href="https://www.linkedin.com/company/magn-hetic/" aria-label="LinkedIn"><img src="/logo/linkedin_logo_black.svg" className="h-5"/></a>
                  <a href="https://www.tiktok.com/@magnhetic1" aria-label="TikTok"><img src="/logo/tiktok_logo_black.svg" className="h-5"/></a>
                  <a href="https://www.instagram.com/magnhetic/" aria-label="Instagram"><img src="/logo/instagram_logo_black.svg" className="h-5"/></a>
                </div>
              </div>
            </nav>
            </div>
          </div>
        )}
    </header>
  )
}

export default Header
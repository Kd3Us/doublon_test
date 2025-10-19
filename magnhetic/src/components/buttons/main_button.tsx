"use client"

import React from "react"
import { useRouter } from "next/navigation"

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    href?: string
    target?: string
}

const base = "inline-flex items-center justify-center rounded-xl shadow-md transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
const variants: Record<string, string> = {
    primary: "bg-linear-to-br from-[#98D8EF] via-[#98D8EF] to-[#D6F0EA] text-[#41585F] hover:bg-[#98D8EF] focus-visible:ring-black",
    secondary: "bg-transparent text-[#41585F] border border-[#41585F] hover:bg-black/90 hover:text-white focus-visible:ring-black/30",
    ghost: "bg-transparent text-black hover:bg-black/5 focus-visible:ring-black/20"
}
const sizes: Record<string, string> = {
    sm: "h-9 px-6 text-sm",
    md: "h-11 px-7 text-base",
}


export default function MainButton({
    children,
    onClick,
    className = "",
    variant = "primary",
    size = "md",
    href,
    target
}: ButtonProps) {
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
    const router = useRouter()

    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={classes}
                onClick={(e) => {
                    if (onClick) onClick()
                    const isInternal = href.startsWith("/") && (!target || target === "_self")
                    if (isInternal) {
                        e.preventDefault()
                        window.dispatchEvent(new CustomEvent("page-transition-navigate", { detail: { href } }))
                    }
                }}
            >
                {children}
            </a>
        )
    }

    return (
        <button type="button" className={classes} onClick={onClick}>
            {children}
        </button>
    )
}

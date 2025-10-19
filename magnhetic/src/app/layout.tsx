import "./globals.css";
import { Inter, Red_Hat_Display } from "next/font/google";
import Stripe from "@/components/Stripe";
import LenisProvider from "@/components/LenisProvider";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import RouteReadyAnnouncer from "@/components/RouteReadyAnnouncer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-red-hat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${redHat.variable} antialiased bg-[#F6F4EB]`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          {/* Persistent background Stripe across routes */}
          <Stripe className="w-full h-full" />
        </div>
        <PageTransitionOverlay />
        <LenisProvider>
          <RouteReadyAnnouncer />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

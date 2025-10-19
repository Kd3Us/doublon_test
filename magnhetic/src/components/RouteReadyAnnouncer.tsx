"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteReadyAnnouncer() {
  const pathname = usePathname();

  useEffect(() => {
    // After mount on new route, tell the overlay the route is ready
    // You can delay this if you wait for data/images
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("page-transition-ready"));
    });
  }, [pathname]);

  return null;
}



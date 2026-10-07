"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Closes the CSS-only mobile menu and its groups after a client-side navigation. */
export function MobileNavReset() {
  const pathname = usePathname();

  useEffect(() => {
    const toggle = document.getElementById("mobile-nav-toggle") as HTMLInputElement | null;
    if (toggle) toggle.checked = false;
    document
      .querySelectorAll<HTMLDetailsElement>("#mobile-panel details[open]")
      .forEach((d) => (d.open = false));
    // Drop focus so a hovered-and-clicked desktop dropdown closes too.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [pathname]);

  return null;
}

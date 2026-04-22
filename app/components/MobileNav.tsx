"use client";

import Image from "next/image";
import {useState} from "react";
import {MENUS} from "../data/menus";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 햄버거 버튼: 모바일 크기에서만 보임 */}
      <button
        type="button"
        aria-label="open munu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        className="md:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}>
        <Image src="/icon-menu.svg" alt="menu" width={16} height={15} />
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/75 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />

      {/* 사이드바 */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`fixed inset-y-0 left-0 z-50 w-2/3 max-w-xs bg-white p-6 md:hidden transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button type="button" aria-label="close menu" onClick={() => setIsOpen(false)} className="mb-12 cursor-pointer">
          <Image src="/icon-close.svg" width={14} height={15} alt="close" />
        </button>

        <nav>
          <ul className="flex flex-col gap-5 text-lg font-bold text-foreground">
            {MENUS.map((m) => (
              <li key={m}>
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-primary focus-visible:text-primary focus-visible:outline-none">
                  {m}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

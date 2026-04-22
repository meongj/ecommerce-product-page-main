"use client";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 / esc 클릭시 닫기
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // todo: 더미 데이터
  const isEmpty = false;
  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        aria-label="open cart"
        onClick={() => setOpen((v) => !v)}
        className="text-muted hover:text-foreground cursor-pointer focus-visible:text-foreground focus-visible:outline-foreground">
        <Image src="/icon-cart.svg" alt="cart" width={22} height={20} />
      </button>

      {/* 팝오버 */}
      <div
        role="dialog"
        aria-label="Cart"
        className={`fixed left-10 right-10 top-[80px] z-50  rounded-xl bg-white shadow-2xl md:absolute md:left-auto md:-right-10 md:top-full md:mt-7 md:w-96 lg:left-auto
 lg:-right-50         ${open ? "block" : "hidden"}
        `}>
        <h2 className="border-b border-border px-6 py-5 font-bold">Cart</h2>

        <div className="px-6 py-8">
          {isEmpty ? (
            <p className="py-12 text-center font-bold text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ul className="mb-6 flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <Image src="/image-product-1-thumbnail.jpg" alt="" width={50} height={50} className="rounded" />
                  <div className="flex-1 text-muted">
                    <p>Fall Limited Edition Sneakers</p>
                    <p>
                      $125.00 x 3 <span className="font-bold text-foreground">$375.00</span>
                    </p>
                  </div>
                  <button type="button" aria-label="Remove item" className="cursor-pointer">
                    <Image src="/icon-delete.svg" alt="" width={14} height={16} />
                  </button>
                </li>
              </ul>

              <button
                type="button"
                className="w-full cursor-pointer bg-primary text-foreground rounded-lg py-4 font-bold transition-opacity hover:opacity-75">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

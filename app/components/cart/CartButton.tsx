"use client";
import Image from "next/image";
import {useRef, useState} from "react";
import {CartPopover} from "./CartPopover";
import {useClickOutside} from "@/app/hooks/useClickOutside";
import {useEscapeKey} from "@/app/hooks/useEscapeKey";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 / esc 클릭시 닫기
  useClickOutside(wrapperRef, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

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
      <CartPopover open={open} isEmpty={isEmpty} />
    </div>
  );
}

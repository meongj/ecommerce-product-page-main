import Image from "next/image";
import {MobileNav} from "./MobileNav";

const MENUS = ["Collections", "Men", "Women", "About", "Contact"];

export function Header() {
  return (
    <header className="flex items-center  justify-between lg:py-10 md:px-6 md:py-5 md:border-border md:border-b px-5 py-4 mx-auto w-full max-w-6xl ">
      <div className="flex md:gap-14 gap-5 items-center">
        <MobileNav />

        {/* 로고 */}
        <Image src="/logo.svg" alt="logo" className="cursor-pointer" width={138} height={20} priority />
        {/* 메뉴들 */}
        <nav className="gap-8 text-muted text-sm hidden md:flex" aria-label="primary">
          {MENUS.map((m) => (
            <a
              key={m}
              href="#"
              className="hover:text-foreground focus-visible:text-foreground focus-visible:outline-none cursor-pointer">
              {m}
            </a>
          ))}
        </nav>
      </div>

      {/* 장바구니, 프로필 */}
      <div className="flex md:gap-10 items-center gap-5">
        <button
          type="button"
          aria-label="open cart"
          className="text-muted hover:text-foreground cursor-pointer focus-visible:text-foreground focus-visible:outline-foreground">
          <Image src="/icon-cart.svg" alt="cart" width={22} height={20} />
        </button>
        <button
          aria-label="open profile"
          className="rounded-full hover:ring-2 hover:ring-primary  cursor-pointer focus-visible:ring-2 focus-visible: ring-primary focus-visible:outline-foreground">
          <Image src="/image-avatar.png" alt="profile" width={40} height={40} className="rounded-full" />
        </button>
      </div>
    </header>
  );
}

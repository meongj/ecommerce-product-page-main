import Image from "next/image";

const MENUS = ["Collections", "Men", "Women", "About", "Contact"];

export function Header() {
  return (
    <header className="flex justify-between py-10">
      <div className="flex gap-14 items-center">
        {/* 로고 */}
        <Image src="/logo.svg" alt="logo" className="cursor-pointer" width={138} height={20} priority />
        {/* 메뉴들 */}
        <nav className="flex gap-8 text-muted text-sm" aria-label="primary">
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
      <div className="flex gap-6 items-center">
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

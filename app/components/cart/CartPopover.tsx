import Image from "next/image";

type CartPopoverProps = {
  open: boolean;
  isEmpty: boolean;
};

export function CartPopover({open, isEmpty}: CartPopoverProps) {
  return (
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
  );
}

import Image from "next/image";
import { product } from "../data/product";

export function ProductInfo() {
  return (
    <section className="flex flex-col gap-4 px-6 py-6 md:px-0 lg:gap-6 lg:py-0">
      <p className="text-primary text-xs font-bold tracking-[0.15em] uppercase lg:text-sm">
        {product.company}
      </p>

      <h1 className="text-foreground text-3xl leading-tight font-bold lg:text-4xl">
        {product.name}
      </h1>

      <p className="text-muted lg:text-base">{product.description}</p>

      {/* 가격 */}
      <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-2">
        <div className="flex items-center gap-4">
          <span className="text-foreground text-3xl font-bold">${product.price.toFixed(2)}</span>
          <span className="bg-foreground rounded-md px-2 py-0.5 text-sm font-bold text-white">
            {product.discountPercent}%
          </span>
        </div>
        <span className="text-muted text-sm font-bold line-through">
          ${product.originalPrice.toFixed(2)}
        </span>
      </div>

      {/* 수량 + Add to cart */}
      <div className="mt-2 flex flex-col gap-4 lg:mt-4 lg:flex-row">
        {/* 수량 (틀만) */}
        <div className="bg-surface flex items-center justify-between rounded-lg px-5 py-4 lg:w-40">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="cursor-pointer transition hover:opacity-50"
          >
            <Image src="/icon-minus.svg" alt="" width={12} height={4} />
          </button>
          <span className="text-foreground font-bold">0</span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="cursor-pointer transition hover:opacity-50"
          >
            <Image src="/icon-plus.svg" alt="" width={12} height={12} />
          </button>
        </div>

        {/* Add to cart (틀만) */}
        <button
          type="button"
          className="bg-primary text-foreground shadow-primary/25 flex flex-1 cursor-pointer items-center justify-center gap-4 rounded-lg px-6 py-4 font-bold shadow-lg transition hover:opacity-75"
        >
          <Image
            src="/icon-cart.svg"
            alt=""
            width={18}
            height={16}
            className="[filter:brightness(0)]"
          />
          Add to cart
        </button>
      </div>
    </section>
  );
}

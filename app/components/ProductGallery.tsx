"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { product } from "../data/product";
import Image from "next/image";
import { ProductLightbox } from "./ProductLightbox";

export function ProductGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // embla <-> state 동기화
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleMainClick = () => {
    // 데스크톱에서만 라이트박스
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      setLightboxOpen(true);
    }
  };

  return (
    <div className="w-full lg:max-w-md">
      {/* 메인 이미지 + Embla viewport */}
      <div className="relative">
        <div className="overflow-hidden md:rounded-xl" ref={emblaRef}>
          <div className="flex">
            {product.images.map((img, i) => (
              <button
                key={img.full}
                type="button"
                onClick={handleMainClick}
                aria-label="Open fullscreen gallery"
                className="relative aspect-square flex-[0_0_100%] md:cursor-pointer"
              >
                <Image
                  src={img.full}
                  alt={`Product image ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(min-width: 1024px) 28rem, 100vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 모바일 전용 */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous image"
          className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md md:hidden"
        >
          <Image src="/icon-previous.svg" alt="" width={12} height={14} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next image"
          className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md md:hidden"
        >
          <Image src="/icon-next.svg" alt="" width={12} height={14} />
        </button>
      </div>

      {/* 썸네일 (md+ 전용) */}
      <div className="mt-8 hidden grid-cols-4 gap-6 md:grid">
        {product.images.map((img, i) => {
          const active = i === selectedIndex;
          return (
            <button
              key={img.thumb}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Select image ${i + 1}`}
              aria-current={active}
              className={`relative aspect-square overflow-hidden rounded-lg transition ${active ? "ring-primary ring-2" : "hover:opacity-75"}`}
            >
              <Image
                src={img.thumb}
                alt=""
                fill
                className={`object-cover ${active ? "opacity-50" : ""}`}
                sizes="6rem"
              />
            </button>
          );
        })}
      </div>

      <ProductLightbox
        open={lightboxOpen}
        initialIndex={selectedIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}

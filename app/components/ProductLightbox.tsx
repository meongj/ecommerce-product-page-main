import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { product } from "../data/product";

type Props = {
  open: boolean;
  initialIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

export function ProductLightbox({ open, initialIndex, onClose, onIndexChange }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // ESC로 닫기 (기존 훅 재사용)
  useEscapeKey(onClose, open);

  // body 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 열 때마다 initialIndex로 점프
  useEffect(() => {
    if (!open || !emblaApi) return;
    emblaApi.scrollTo(initialIndex, true);
    setSelectedIndex(initialIndex);
  }, [open, initialIndex, emblaApi]);

  // Embla ↔ state 동기화
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const i = emblaApi.selectedScrollSnap();
      setSelectedIndex(i);
      onIndexChange?.(i);
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onIndexChange]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product image lightbox"
      onClick={onClose}
      className="fixed inset-0 z-50 hidden items-center justify-center bg-black/75 md:flex"
    >
      {/* 내부 영역: 백드롭 클릭 전파 차단 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-xl flex-col gap-8 px-4"
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={onClose}
            className="group cursor-pointer"
          >
            <Image src="/icon-close.svg" alt="close" width={20} height={20} />
          </button>
        </div>

        {/* 메인 이미지 + prev/next */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {product.images.map((img, i) => (
                <div key={img.full} className="relative aspect-square flex-[0_0_100%]">
                  <Image
                    src={img.full}
                    alt={`Product image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="36rem"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous image"
            className="group absolute top-1/2 -left-6 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white"
          >
            <Image src="/icon-previous.svg" alt="" width={12} height={14} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next image"
            className="group absolute top-1/2 -right-6 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white"
          >
            <Image src="/icon-next.svg" alt="" width={12} height={14} />
          </button>
        </div>

        {/* 썸네일 */}
        <div className="grid grid-cols-4 gap-6 px-8">
          {product.images.map((img, i) => {
            const active = i === selectedIndex;
            return (
              <button
                key={img.thumb}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Select image ${i + 1}`}
                aria-current={active}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg transition ${active ? "ring-primary ring-2" : "hover:opacity-75"}`}
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
      </div>
    </div>
  );
}

import { Header } from "./components/Header";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-0 py-0 md:px-6 md:py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-0 lg:flex-row lg:items-center lg:gap-20">
          <ProductGallery />
          <ProductInfo />
        </div>
      </main>
    </div>
  );
}

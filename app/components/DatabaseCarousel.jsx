import { Link, useLocation } from "react-router";
import { useRef } from "react";
import { otherDatabaseProducts } from "../lib/catalog";
import {IconArrowRight,IconArrowLeft} from "@tabler/icons-react";

export function DatabaseCarousel({ excludeProductId }) {
  const { search } = useLocation();
  const items = otherDatabaseProducts(excludeProductId);
  const scrollRef = useRef(null);

  if (items.length === 0) return null;

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="mt-14 border-t border-[#ed501f]/15 pt-10 sm:mt-16 sm:pt-12"
      aria-labelledby="ds-db-carousel-heading"
    >
      <h2 className="font-heading text-lg font-bold text-[#5c5c5c] sm:text-xl">
        Explore other databases
      </h2>

      <div className="relative mt-6">
        
        {/* LEFT BUTTON */}
        <button onClick={() => scroll("left")} className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:scale-105 transition cursor-pointer"><IconArrowLeft size={20}/></button>

        {/* RIGHT BUTTON */}
        <button onClick={() => scroll("right")} className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:scale-105 transition cursor-pointer"><IconArrowRight size={20}/></button>

        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-3 pl-8 pr-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-[min(17.5rem,82vw)] rounded-2xl border border-[#ed501f]/20 bg-white shadow-md transition hover:shadow-lg">
              <div className="overflow-hidden rounded-t-2xl">
                <img src={product.carouselImage} alt={product.title} className="aspect-4/3 w-full object-cover"/>
              </div>

              <div className="p-4">
                <span className="text-[11px] font-semibold uppercase text-[#ed501f]">
                  {product.category}
                </span>

                <h3 className="mt-1 text-sm font-bold text-[#5c5c5c] line-clamp-2">
                  {product.title}
                </h3>

                <Link to={`${product.appPath}${search}`} className="mt-3 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-4 py-2 inline-flex text-xs font-bold text-white">
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
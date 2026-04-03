import { Link, useLocation } from "react-router";
import { useRef } from "react";
import { otherDatabaseProducts } from "../lib/catalog";
import {IconArrowRight,IconArrowLeft,IconDownload} from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
export function DatabaseCarousel({ excludeProductId,length }) {
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
    <section aria-labelledby="ds-db-carousel-heading">
      <div className="relative mt-6">
        {/* LEFT BUTTON */}
        <button onClick={() => scroll("left")} className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:scale-105 transition cursor-pointer"><IconArrowLeft size={20}/></button>

        {/* RIGHT BUTTON */}
        <button onClick={() => scroll("right")} className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:scale-105 transition cursor-pointer"><IconArrowRight size={20}/></button>

        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.slice(0, length || items.length).map((item,i) => (
            <div key={i} className="min-w-full sm:min-w-[50%] lg:min-w-[30%]">
              <Link to={`${item.appPath}${search}`}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-[#fff7f4] via-white to-[#fef7f4] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      
                  <div className="absolute -bottom-3 -right-2 font-heading text-7xl font-black text-muted/50 group-hover:text-[#ed501f]/10">
                  {item.size}
                  </div>

                  <div className="relative">
                    <div className="overflow-hidden rounded-2xl mb-4">
                      <img src={item.carouselImage} alt={item.title} className="aspect-4/3 w-full object-cover"/>
                    </div>

                    <span className="rounded-lg px-3 py-1 text-xs font-semibold text-[#ed501f] bg-[#ed501f]/10">{item.category}</span>

                    <p className="mt-2 text-sm font-bold w-64 truncate">{item.title}</p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <IconDownload size={14} className="text-[#ed501f]" />
                      {item.records} · Instant download
                    </div>
                    <div className="flex gap-2 items-center mt-3">
                      <div>
                        <Link to={`${item.appPath}${search}`} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl">
                          Buy <IconArrowRight size={14} />
                        </Link>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-lg font-bold">{item.percentOff}% off</p>
                        <p className="text-sm text-muted-foreground line-through">₹{item.cutPrice.toLocaleString()}</p>
                        <p className="text-lg text-[#ed501f] font-bold">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
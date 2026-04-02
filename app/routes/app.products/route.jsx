import { Link,useLocation } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";
import { motion } from "motion/react";
import { DATA_PRODUCTS } from "../../lib/catalog";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const COLLECTIONS = DATA_PRODUCTS

export default function AllDatabases() {
  const { search } = useLocation();
  return (
    <>
      <section id="databases" className="bg-background py-20">
        <div className="px-4 sm:px-6 lg:px-8 min-[1100px]:px-13">
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {COLLECTIONS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative lg:col-span-1 overflow-hidden rounded-3xl border border-primary/15 bg-linear-to-br from-[#5c5c5c]/90 to-foreground/90 p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="absolute -bottom-3 -right-2 font-heading text-7xl font-black text-muted/10 transition-colors group-hover:text-[#ed501f]/10">
                  {item.size}
                </div>

                <div className="relative">
                  <div className="overflow-hidden rounded-2xl mb-4">
                    <img src={item.carouselImage} alt={item.title} className="aspect-4/3 w-full object-cover"/>
                  </div>
                  <div>
                    <span className="rounded-lg bg-[#ed501f]/10 px-3 py-1 font-heading text-xs font-semibold text-[#ed501f]">{item.category}</span>
                    <p className="mt-2 font-heading text-base font-bold text-white w-85 truncate">{item.title}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <IconDownload size={14} className="text-[#ed501f]" />
                      {item.records} · Instant download
                    </div>
                  </div>
                  <div className="flex gap-2 items-center mt-3">
                    <div>
                      <Link to={`${item.appPath}${search}`} className="group/btn inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-4 py-2 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/35 sm:w-auto sm:min-h-0">
                        Buy <IconArrowRight size={14}/>
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-bold text-white">{item.percentOff}% off</p>
                      <p className="text-lg text-muted-foreground line-through">₹{item.cutPrice.toLocaleString()}</p>
                      <p className="text-lg text-[#ed501f] font-bold">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);

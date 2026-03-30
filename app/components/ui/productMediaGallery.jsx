import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductMediaGallery = ({ media = [] }) => {
  const [selectedMedia, setSelectedMedia] = useState(media[0]);

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden">
      {/* 🔥 Main Preview */}
      <div className="w-full">
        {selectedMedia?.type === "image" ? (
          <img
            src={selectedMedia.src}
            alt="product"
            className="h-[min(50vh,22rem)] w-full max-w-full rounded-2xl border-2 border-[#ed501f] object-cover sm:h-80 md:h-96 lg:h-112 xl:h-140"
          />
        ) : (
            <video
                src={selectedMedia.src}
                className="h-[min(50vh,22rem)] w-full max-w-full rounded-2xl border-2 border-[#ed501f] object-cover sm:h-80 md:h-96 lg:h-112 xl:h-140"
                controls
                autoPlay
            >
                <track
                    kind="captions"
                    src="/captions.vtt"
                    srcLang="en"
                    label="English"
                    default
                />
            </video>
        )}
      </div>

      {/* 🔥 Thumbnails */}
      <div className="mt-3 grid w-full grid-cols-3 gap-2 sm:grid-cols-6">
        {media.map((item, index) => (
            <button
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className={`h-14 cursor-pointer overflow-hidden rounded-md border sm:h-16 md:h-20 ${
                    selectedMedia?.src === item.src
                    ? "border-2 border-[#ed501f]"
                    : "border-gray-300"
                }`}
            >
                {item.type === "image" ? (
                <img
                    src={item.src}
                    alt={`thumb-${index}`}
                    className="object-cover w-full h-full"
                />
                ) : (
                <div className="relative w-full h-full">
                    <video
                    src={item.src}
                    className="object-cover w-full h-full"
                    muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#ed501f] bg-white w-8 h-8 flex items-center justify-center rounded-full text-base">
                       ▶
                      </div>
                    </div>
                </div>
                )}
            </button>
        ))}
      </div>
    </div>
  );
};

export default ProductMediaGallery;
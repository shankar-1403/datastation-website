import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductMediaGallery = ({ media = [] }) => {
  const [selectedMedia, setSelectedMedia] = useState(media[0]);

  return (
    <div className="w-full">
      {/* 🔥 Main Preview */}
      <div className="w-full">
        {selectedMedia?.type === "image" ? (
          <img
            src={selectedMedia.src}
            alt="product"
            className="w-full h-100 object-cover border-2 border-[#ed501f] rounded-2xl"
          />
        ) : (
            <video
                src={selectedMedia.src}
                className="w-full h-100 object-cover border-2 border-[#ed501f] rounded-2xl"
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
      <div className="grid grid-cols-6 gap-2 w-full mt-3">
        {media.map((item, index) => (
            <button
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className={`h-20 rounded-md border overflow-hidden ${
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
                    {/* ▶ Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                    ▶
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
import React from "react";
import Image from "next/image";

interface LocationCardProps {
  name: string;
  imageUrl: string;
  internalUrl: string;
  mapUrl: string;
  alt: string;
}

export default function LocationCard({
  name,
  imageUrl,
  internalUrl,
  mapUrl,
  alt,
}: LocationCardProps) {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image src={imageUrl} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-100 md:opacity-0 md:hover:opacity-100 md:transition-opacity md:duration-300">
          {internalUrl ? (
            <a
              href={internalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black py-2 px-4 rounded"
            >
              More information
              <span className="sr-only"> about {name}</span>
            </a>
          ) : (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black py-2 px-4 rounded"
            >
              View on Google Maps
            </a>
          )}
        </div>
      </div>
      <div className="py-3 text-center">
        <div className="font-bold text-2xl">{name}</div>
      </div>
    </div>
  );
}

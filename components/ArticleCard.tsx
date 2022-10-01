import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Placeholder from "../assets/images/placeholder.png";

export default function ArticleCard({ item, small }: any) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/articles/${item.id}`}>
      <div className="bg-white cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
        <div
          className={`relative border-b border-gray-200 ${
            small ? "sm:h-28 h-36" : "sm:h-28 h-48"
          } w- align-middle rounded-t-[6px] overflow-hidden`}
        >
          <Image
            src={imageError || !item.image ? Placeholder : item.image}
            onError={() => setImageError(true)}
            placeholder="blur"
            className="absolute inset-0 object-cover object-center"
            objectFit="cover"
            alt={item.name}
            layout="fill"
            blurDataURL={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcXw8AAcMBIFDR+9UAAAAASUVORK5CYII="
            }
          />
        </div>
        <div className={`px-3 sm:px-2 pt-[6px] pb-3`}>
          <h4 className="line-clamp-1 sm:line-clamp-2 sm:text-[13px] text-[14px] font-bold mt-2 mb-2">
            {item.title}
          </h4>
          <p className="font-semibold line-clamp-2 sm:hidden text-sm  text-gray-500 leading-[25px]">
            {item.description}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="rounded-sm flex items-center text-[11px] bg-gray-100 font-semibold text-gray-600 capitalize px-2 py-1">
              <div className="h-[6px] w-[6px] mr-2 bg-gray-400 rounded-full" />{" "}
              {item.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

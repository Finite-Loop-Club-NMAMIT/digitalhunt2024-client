import Image from "next/image";
import React from "react";

import { env } from "~/env";

const Plane = ({
  idx,
  isOddOneOut = false,
}: {
  idx: number;
  isOddOneOut?: boolean;
}) => {
  const imageSrc = isOddOneOut
    ? "/image/eqw4rK7SRu2q7QcK.png"
    : "/image/eqw4rK7SRu2q7QeK.png";

  return (
    <div
      className="relative size-32 animate-plane"
      style={{
        animationDuration: `${15 + Math.random() * 10}s`,
        filter: `hue-rotate(${idx * 60}deg)`,
      }}
    >
      <a
        href={`${env.NEXT_PUBLIC_URL}${imageSrc}`}
        onClick={(e) => e.preventDefault()}
        className="cursor-default"
      >
        <div className="relative size-full">
          <Image
            src={imageSrc}
            alt="hello-kitty"
            className="object-contain"
            fill
          />
        </div>
      </a>
    </div>
  );
};

export default Plane;
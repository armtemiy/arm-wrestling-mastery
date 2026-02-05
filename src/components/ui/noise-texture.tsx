import React from "react";

export const NoiseTexture = ({ opacity = 0.05 }: { opacity?: number }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[9999] h-full w-full overflow-hidden"
      style={{ opacity }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

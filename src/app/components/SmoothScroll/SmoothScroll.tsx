"use client";

import ReactLenis from "lenis/react";
import { useWindowSize } from "usehooks-ts";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

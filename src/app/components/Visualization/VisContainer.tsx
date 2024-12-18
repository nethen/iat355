"use client";
import clsx from "clsx";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { useContext } from "react";
import { useRef } from "react";

type VisContainerProps = {
  children?: React.ReactNode;

  background?: boolean;
  height?: number;
};

const ResizeObserverContext =
  React.createContext<React.MutableRefObject<null> | null>(null);

export const VisContainer = ({
  children,
  background = true,
}: // height = 200,
VisContainerProps) => {
  const ref = useRef(null);
  const figureRef = useRef(null);

  return (
    <ResizeObserverContext.Provider value={figureRef}>
      <article
        ref={ref}
        className="col-span-full lg:col-span-7 2xl:col-start-2 2xl:col-span-5 relative grid grid-cols-subgrid auto-rows-min md:py-[2.25em] lg:pt-0 lg:pb-[4.5em]"
        // style={{ height: `${height}svh` }}
      >
        <figure
          className={clsx(
            "col-span-full max-w-full rounded-lg md:p-8  min-h-[24rem]",
            background && "bg-diagram"
          )}
          ref={figureRef}
        >
          {children}
        </figure>
      </article>
    </ResizeObserverContext.Provider>
  );
};

export const useResizeObserverContext = () => {
  return useContext(ResizeObserverContext);
};

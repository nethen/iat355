"use client";
import { MotionValue, useScroll } from "motion/react";
import React, { useContext } from "react";
import { useRef } from "react";

type VisContainerProps = {
  children?: React.ReactNode;
};

const ScrollYProgressContext = React.createContext(new MotionValue());

export const ScrollyVisContainer = ({ children }: VisContainerProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // const scale = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  return (
    <ScrollYProgressContext.Provider value={scrollYProgress}>
      <article
        ref={ref}
        className="col-span-full lg:col-span-7 2xl:col-start-2 2xl:col-span-5 relative grid grid-cols-subgrid auto-rows-min h-[200svh] md:py-[2.25em] lg:py-[4.5em]"
      >
        <figure className="sticky top-[6.375em] md:top-[2.25em] col-span-full max-w-full aspect-square lg:aspect-video bg-diagram rounded-lg md:p-8">
          {children}
        </figure>
      </article>
    </ScrollYProgressContext.Provider>
  );
};

export const useScrollYProgress = () => {
  return useContext(ScrollYProgressContext);
};

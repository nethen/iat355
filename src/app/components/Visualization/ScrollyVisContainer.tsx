"use client";
import clsx from "clsx";
import { MotionValue, useScroll } from "motion/react";
import React, { useContext } from "react";
import { useRef } from "react";

type VisContainerProps = {
  children?: React.ReactNode;
  captions?: React.ReactNode;
  background?: boolean;
};

const ScrollYProgressContext = React.createContext(new MotionValue());

export const ScrollyVisContainer = ({
  children,
  captions,
  background = true,
}: VisContainerProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  console.log(background);

  // const scale = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  return (
    <ScrollYProgressContext.Provider value={scrollYProgress}>
      <article
        ref={ref}
        className="col-span-full lg:col-start-2 lg:col-span-5 relative grid grid-cols-subgrid auto-rows-min h-[200svh] md:py-[2.25em] lg:py-[4.5em]"
      >
        <figure
          className={clsx(
            "sticky top-[6.375em] md:top-[2.25em] col-span-full max-w-full rounded-lg md:p-8",
            background && "bg-diagram"
          )}
        >
          {children}
        </figure>
      </article>
      <aside className="max-lg:fixed inset-x-0 bottom-0 lg:sticky lg:top-[2.25em] h-full max-h-[6.75em] 2xl:col-span-2 lg:min-h-svh bg-blue-500">
        {captions}
      </aside>
    </ScrollYProgressContext.Provider>
  );
};

export const useScrollYProgress = () => {
  return useContext(ScrollYProgressContext);
};

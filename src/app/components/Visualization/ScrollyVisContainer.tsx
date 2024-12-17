"use client";
import clsx from "clsx";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { useContext } from "react";
import { useRef } from "react";

type VisContainerProps = {
  children?: React.ReactNode;
  captions?: { title: string; text: string }[];
  background?: boolean;
  height?: number;
};

const ScrollYProgressContext = React.createContext(new MotionValue());

export const ScrollyVisContainer = ({
  children,
  captions,
  background = true,
  height = 200,
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
        className="col-span-full lg:col-span-7 2xl:col-start-2 2xl:col-span-5 relative grid grid-cols-subgrid auto-rows-min md:py-[2.25em] lg:py-[4.5em]"
        style={{ height: `${height}svh` }}
      >
        <div className="col-span-full h-full sticky top-[6.375em] md:top-[2.25em] flex flex-col justify-between">
          <div className="col-span-full relative h-28 xs:h-32">
            {captions?.map((caption, index) => (
              <div key={index} className="absolute inset-0">
                <motion.p
                  className="text-r-base xs:text-r-sm"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.1 + 0.1 * index, 0.25 + 0.25 * index, 0.6],
                      [0, 1, 0]
                    ),
                  }}
                >
                  {caption.text}
                </motion.p>
              </div>
            ))}
          </div>
          <figure
            className={clsx(
              "col-span-full max-w-full rounded-lg md:p-8",
              background && "bg-diagram"
            )}
          >
            {children}
          </figure>
        </div>
      </article>
      {/* <aside className="max-lg:fixed inset-x-0 bottom-0 lg:sticky lg:top-[2.25em] h-full max-h-[6.75em] 2xl:col-span-2 lg:min-h-svh bg-blue-500">
        {captions?.map((caption, index) => (
          <div key={index}>
            <h3 className="text-r-sm">{caption.title}</h3>
            <p className="text-r-sm">{caption.text}</p>
          </div>
        ))}
      </aside> */}
    </ScrollYProgressContext.Provider>
  );
};

export const useScrollYProgress = () => {
  return useContext(ScrollYProgressContext);
};

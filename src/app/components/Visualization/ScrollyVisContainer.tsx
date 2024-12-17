"use client";
import clsx from "clsx";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { useContext } from "react";
import { useRef } from "react";

type VisContainerProps = {
  children?: React.ReactNode;
  captions?: { title: string; text: string; stop: number }[];
  background?: boolean;
  height?: number;
};

const ScrollYProgressContext = React.createContext(new MotionValue());
const HasCaptionContext = React.createContext(false);

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
    <HasCaptionContext.Provider value={captions ? true : false}>
      <ScrollYProgressContext.Provider value={scrollYProgress}>
        <article
          ref={ref}
          className="col-span-full lg:col-span-7 2xl:col-start-2 2xl:col-span-5 relative grid grid-cols-subgrid auto-rows-min md:py-[2.25em] lg:py-[4.5em]"
          style={{ height: `${height}svh` }}
        >
          <div className="col-span-full h-svh sticky top-0 grid grid-cols-subgrid justify-between gap-y-4">
            {captions && (
              <div className="col-span-full relative h-28 sm:h-32 md:col-span-3 md:col-start-2">
                {captions?.map((caption, index) => (
                  <div key={index} className="absolute inset-0">
                    <Caption
                      title={caption.title}
                      text={caption.text}
                      stop={caption.stop}
                      nextStop={captions[index + 1]?.stop || 1}
                      previousStop={captions[index - 1]?.stop || 0}
                    />
                  </div>
                ))}
              </div>
            )}
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
    </HasCaptionContext.Provider>
  );
};

const Caption = ({
  title,
  text,
  previousStop,
  stop,
  nextStop,
}: {
  title: string;
  text: string;
  previousStop: number;
  stop: number;
  nextStop: number;
}) => {
  const scrollYProgress = useScrollYProgress();
  const opacity = useTransform(
    scrollYProgress,
    // [
    //   captions[index - 1]?.stop || 0,
    //   caption.stop,
    //   caption.stop + 0.075,
    // ],
    [stop, stop + 0.075, nextStop],
    [previousStop == 0 ? 1 : 0, 1, nextStop == 1 ? 1 : 0]
  );
  return (
    <motion.p
      className="text-r-micro xs:text-r-base sm:text-r-xs"
      style={{
        opacity,
      }}
    >
      {text}
    </motion.p>
  );
};

export const useScrollYProgress = () => {
  return useContext(ScrollYProgressContext);
};

export const useHasCaption = () => {
  return useContext(HasCaptionContext);
};

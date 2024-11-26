import { motion, MotionValue, useScroll, useTransform } from "motion/react";
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

  const scale = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  return (
    <ScrollYProgressContext.Provider value={scrollYProgress}>
      <article
        ref={ref}
        className="col-span-full lg:col-span-7 2xl:col-start-2 2xl:col-span-5 relative grid grid-cols-subgrid auto-rows-min"
      >
        <div className="sticky top-0 h-0 col-span-full">
          <motion.div
            className="sticky col-span top-0 size-16 rounded-full bg-blue-500"
            style={{ scale: scale }}
          ></motion.div>
        </div>
        <figure className="col-span-full max-w-full aspect-square lg:aspect-video bg-diagram rounded-lg">
          {/* {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? cloneElement(child, { scrollYProgress })
            : child
        )} */}
          {children}
        </figure>
      </article>
    </ScrollYProgressContext.Provider>
  );
};

export const useScrollYProgress = () => {
  return useContext(ScrollYProgressContext);
};

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const ScrollyVisContainer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  return (
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
        {/* <div>{scale.get()}</div> */}
      </figure>
    </article>
  );
};

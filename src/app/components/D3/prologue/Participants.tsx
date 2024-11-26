import { motion, MotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";

export const Participants = () => {
  const scrollYProgress = useScrollYProgress();
  const scale = useTransform(scrollYProgress, [0.25, 1], [0, 1]);
  useEffect(() => {
    console.log(scrollYProgress);
  }, []);
  return (
    <motion.div
      className="sticky col-span top-16 right-0 size-16 rounded-full bg-red-500 opacity-50"
      style={{ scale: scale }}
    />
  );
};

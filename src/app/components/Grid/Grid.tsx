"use client";
import { motion } from "motion/react";
import { useBoolean, useEventListener } from "usehooks-ts";

export const Grid = () => {
  const visible = useBoolean(false);
  useEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "G") {
      visible.toggle();
    }
  });
  return (
    <motion.div
      animate={{ opacity: visible.value ? 1 : 0 }}
      className="fixed inset-0 grid-r"
    >
      {[...Array(9)].map((_, i) => (
        <div className="bg-black/5 h-screen" key={`toggle_grid__column-${i}`} />
      ))}
    </motion.div>
  );
};
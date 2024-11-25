"use client";
import { useLenis } from "lenis/react";
import { circOut } from "motion";
import { motion } from "motion/react";
import Link from "next/link";
import { useBoolean, useEventListener, useMediaQuery } from "usehooks-ts";

export const Nav = () => {
  const visible = useBoolean(false);
  const matches = useMediaQuery("(min-width: 768px)");
  useEventListener("keydown", (e) => {
    if (e.key === "a") {
      visible.toggle();
    }
  });
  useEventListener("resize", (e) => {
    visible.setFalse();
  });

  const lenis = useLenis();
  const toggleNav = () => {
    visible.toggle();
    if (!visible.value) {
      lenis?.stop();
      console.log("stop");
    } else {
      lenis?.start();
    }
  };

  return (
    <motion.nav
      className="fixed inset-x-0 max-md:grid-r md:sticky md:inset-y-0 md:h-svh flex flex-col max-md:bg-foreground dark:max-md:bg-[#BD3C00] max-md:text-background overflow-hidden"
      initial={{ height: "4.5em" }}
      animate={{
        height: visible.value || matches ? "100vh" : "4.5em",
      }}
      exit={{ height: "4.5em" }}
      transition={{ ease: circOut }}
    >
      <motion.div
        className="md:hidden col-span-full text-center my-[1.125em] cursor-pointer"
        onClick={() => toggleNav()}
      >
        <div className="font-bold">Act I</div>
        <p>Population</p>
      </motion.div>
      <motion.div
        className="col-span-full flex flex-col gap-y-[1.125em] h-full mb-[2.25em] md:mt-[2.25em]"
        // initial={{ height: 0 }}
        // animate={{ height: visible.value || matches ? "auto" : 0 }}
        // exit={{ height: 0 }}
        // transition={{ duration: matches ? 0 : 0.3 }}
      >
        <Link href="/">
          <motion.div
            className="font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible.value || matches ? 1 : 0 }}
            exit={{ opacity: 0 }}
          >
            Prologue
          </motion.div>
        </Link>
        <Link href="/">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible.value || matches ? 1 : 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="font-bold">Act I</div>
            <p>Population</p>
          </motion.div>
        </Link>
        <Link href="/">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible.value || matches ? 1 : 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="font-bold">Act II</div>
            <p>Program</p>
          </motion.div>
        </Link>
        <Link href="/">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible.value || matches ? 1 : 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="font-bold">Act III</div>
            <p>Practices</p>
          </motion.div>
        </Link>
        <Link href="/" className="md:mt-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible.value || matches ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="font-bold"
          >
            Sources
          </motion.div>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

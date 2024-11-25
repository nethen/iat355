"use client";
import Lenis from "lenis";
import ReactLenis, { useLenis } from "lenis/react";
import { circOut } from "motion";
import { motion, cancelFrame, frame } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { useBoolean, useEventListener, useMediaQuery } from "usehooks-ts";

export const Nav = ({ sectionsInView }: { sectionsInView: boolean[] }) => {
  const visible = useBoolean(false);
  const matches = useMediaQuery("(min-width: 768px)");
  const state = useMemo(
    () => sectionsInView.findLastIndex((e) => e == true),
    [sectionsInView]
  );

  useEffect(() => {
    console.log(sectionsInView);
  }, [sectionsInView]);

  useEventListener("keydown", (e) => {
    if (e.key === "a") {
      visible.toggle();
    }
  });
  useEventListener("resize", () => {
    visible.setFalse();
    console.log(matches);
    lenis?.start();
    if (matches) {
      //   lenis?.stop();
    } else {
    }
  });

  const lenis = useLenis();

  //   const lenisRef = useRef(null);
  //   const scrollContainerRef = useRef(null);

  //   useEffect(() => {
  //     if (!scrollContainerRef.current) return;

  //     const lenis = new Lenis({
  //       wrapper: scrollContainerRef.current,
  //       orientation: "vertical",
  //       smooth: true,
  //       gestureOrientation: "both",
  //     });

  //     lenisRef.current = lenis;
  //     const animate = (time) => {
  //       lenis.raf(time);
  //       requestAnimationFrame(animate);
  //     };
  //     requestAnimationFrame(animate);

  //     return () => {
  //       lenis.destroy();
  //     };
  //   }, [visible.value]);

  const toggleNav = () => {
    if (!visible.value) {
      lenis?.stop();
      console.log("stop");
    } else {
      lenis?.start();
    }
    visible.toggle();
  };

  const toggleNavOff = () => {
    visible.setFalse();
    lenis?.start();
  };

  return (
    <motion.nav
      className="fixed z-50 inset-x-0 grid md:sticky md:inset-y-0 md:h-svh max-md:grid-rows-[min-content_auto] max-md:bg-foreground dark:max-md:bg-[#BD3C00] max-md:text-background overflow-hidden"
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
      <ReactLenis
        // ref={scrollContainerRef}
        className="flex flex-col overflow-y-auto max-h-full"
      >
        <motion.div
          className="max-md:px-8 col-span-full flex flex-col gap-y-[1.125em] mb-[2.25em] md:mt-[2.25em]"
          // initial={{ height: 0 }}
          // animate={{ height: visible.value || matches ? "auto" : 0 }}
          // exit={{ height: 0 }}
          // transition={{ duration: matches ? 0 : 0.3 }}
        >
          <Link href="#prologue" onClick={() => toggleNavOff()}>
            <motion.div
              className="font-bold"
              initial={{ opacity: 0 }}
              animate={{
                opacity: visible.value || matches ? (state == 0 ? 1 : 0.5) : 0,
              }}
              exit={{ opacity: 0 }}
            >
              Prologue
            </motion.div>
          </Link>
          <Link href="#act1" onClick={() => toggleNavOff()}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: visible.value || matches ? (state == 1 ? 1 : 0.5) : 0,
              }}
              exit={{ opacity: 0 }}
            >
              <div className="font-bold">Act I</div>
              <p>Population</p>
            </motion.div>
          </Link>
          <Link href="#act2" onClick={() => toggleNavOff()}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: visible.value || matches ? (state == 2 ? 1 : 0.5) : 0,
              }}
              exit={{ opacity: 0 }}
            >
              <div className="font-bold">Act II</div>
              <p>Program</p>
            </motion.div>
          </Link>
          <Link href="#act3" onClick={() => toggleNavOff()}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: visible.value || matches ? (state == 3 ? 1 : 0.5) : 0,
              }}
              exit={{ opacity: 0 }}
            >
              <div className="font-bold">Act III</div>
              <p>Practices</p>
            </motion.div>
          </Link>
          <div className="h-[150vh]" />
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
      </ReactLenis>
    </motion.nav>
  );
};

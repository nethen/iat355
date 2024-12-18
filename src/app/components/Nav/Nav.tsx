"use client";
import Lenis from "lenis";
import { useLenis } from "lenis/react";
import { circOut } from "motion";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  useBoolean,
  useEventListener,
  useMediaQuery,
  useIsClient,
  useScrollLock,
  useWindowSize,
} from "usehooks-ts";

type NavProps = {
  sectionsInView?: boolean[];
};

export const Nav = ({ sectionsInView }: NavProps) => {
  const reloading = useBoolean(true);
  const inView = useBoolean(false);
  const visible = useBoolean(false);
  const matches = useMediaQuery("(min-width: 768px)");
  const isClient = useIsClient();
  const locker = useScrollLock({ autoLock: false });
  const state = useMemo(
    () => sectionsInView?.findLastIndex((e) => e == true),
    [sectionsInView]
  );

  // prevent phantom iOS scroll events
  const size = useWindowSize();

  useEffect(() => {
    reloading.setTrue();
    setTimeout(() => reloading.setFalse(), 50);
  }, [size]);

  useEffect(() => {
    visible.setFalse();
    // console.log(matches);
    locker.unlock();
    lenis?.start();
    lenisRef.current?.destroy();
  }, [size.width]);

  useEventListener("keydown", (e) => {
    if (e.key === "a") {
      visible.toggle();
    }
  });

  const lenis = useLenis((lenis) => {
    // console.log(lenis.animatedScroll);
    if (lenis.animatedScroll > size.height * 0.5) inView.setTrue();
    else inView.setFalse();
  });

  const lenisRef = useRef<Lenis | null>(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    if (visible.value) {
      const lenis = new Lenis({
        wrapper: scrollContainerRef.current,
        orientation: "vertical",
        smoothWheel: true,
        gestureOrientation: "both",
      });

      lenisRef.current = lenis;
      const animate = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);

      return () => {
        lenis.destroy();
      };
    } else {
      lenisRef.current?.destroy();
    }
  }, [visible.value]);

  const toggleNav = () => {
    console.log(visible.value);
    if (!visible.value) {
      locker.lock();
      lenis?.stop();
      console.log("locking");
    } else {
      locker.unlock();
      lenis?.start();
      console.log("unlocking");
    }
    visible.toggle();
  };

  const toggleNavOff = () => {
    visible.setFalse();
    lenis?.start();
    locker.unlock();
  };

  return (
    <motion.nav
      {...(!matches && isClient && { "data-lenis-prevent": true })}
      className="max-md:hidden text-r-base fixed z-50 inset-x-0 grid md:sticky top-0 md:!h-svh max-md:grid-rows-[min-content_auto] max-md:bg-[#BD3C00] max-md:text-background overflow-hidden"
      initial={{
        height: "4.5em",
        opacity: 0,
        y: isClient && matches ? "0" : "-100%",
      }}
      animate={{
        height: (visible.value || matches) && isClient ? "100vh" : "4.5em",
        opacity: inView.value ? 1 : 0,
        y: (inView.value || matches) && isClient ? "0%" : "-100%",
      }}
      exit={{
        height: "4.5em",
        opacity: 0,
        y: "-100%",
      }}
      transition={{
        ease: circOut,
        duration: isClient ? (reloading.value ? 0 : 0.3) : 0,
      }}
      // onAnimationComplete={() => reloading.setFalse()}
    >
      <motion.div
        className="md:hidden col-span-full text-center my-[1.125em] cursor-pointer"
        onClick={() => toggleNav()}
      >
        <div className="font-bold">Act I</div>
        <p>Population</p>
      </motion.div>
      {/* <motion.div
        ref={scrollContainerRef}
        data-scroll-locked
        className={clsx(
          "flex flex-col overflow-y-auto max-h-full no-scrollbar"
          //   matches && "lenis-stopped"
        )}
      > */}
      <motion.div
        ref={scrollContainerRef}
        {...(!matches && isClient && { "data-lenis-prevent": true })}
        className="max-md:px-8 col-span-full flex flex-col gap-y-[1.125em] mb-[2.25em] md:mt-[2.25em] h-full max-h-svh overflow-auto no-scrollbar"
      >
        <Link
          href="#prologue"
          onClick={() => toggleNavOff()}
          className="pointer-events-auto"
        >
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
        <Link
          href="#act1"
          onClick={() => toggleNavOff()}
          className="pointer-events-auto"
        >
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
        <Link
          href="#act2"
          onClick={() => toggleNavOff()}
          className="pointer-events-auto"
        >
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
        <Link
          href="#act3"
          onClick={() => toggleNavOff()}
          className="pointer-events-auto"
        >
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
        {/* <div className="min-h-[150vh]" /> */}
        {/* <Link href="/" className="md:mt-auto pointer-events-auto mb-[5.75em]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible.value || matches ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="font-bold"
          >
            Sources
          </motion.div>
        </Link> */}
      </motion.div>
      {/* </motion.div> */}
    </motion.nav>
  );
};

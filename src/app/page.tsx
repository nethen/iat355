"use client";
// import Image from "next/image";
import { Grid } from "./components/Grid/Grid";
import ReactLenis from "lenis/react";
import { VisContainer } from "./components/Visualization/VisContainer";
import { Nav } from "./components/Nav/Nav";
import React from "react";
import { useInView } from "motion/react";
export default function Home() {
  const viewRefs = Array.from({ length: 4 }, () =>
    React.createRef<HTMLDivElement>()
  );

  const isInView = [
    useInView(viewRefs[0]),
    useInView(viewRefs[1]),
    useInView(viewRefs[2]),
    useInView(viewRefs[3]),
  ];

  return (
    <ReactLenis root>
      <Grid />
      <div className="grid-r font-[family-name:var(--font-geist-sans)]">
        <Nav sectionsInView={isInView} />
        {/* <div
          className="fixed top-4 right-4 size-16 rounded-full"
          style={{ background: isInView[1] ? "blue" : "red" }}
        ></div> */}
        <main className="max-md:pt-[4.5em] col-span-full py-[1.125em] md:col-span-5 lg:col-span-8 grid grid-cols-subgrid auto-rows-min gap-y-[1.125em]">
          <section
            id="prologue"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            ref={viewRefs[0]}
          >
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <h2 className="text-r-md">Prologue</h2>
            </div>
            <VisContainer />
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              When considering the design schools around the Lower Mainland,
              SIAT is a rare breed. With a jack of all trades mindset, students
              are exposed to a variety of disciplines in their first and second
              years.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              When considering the design schools around the Lower Mainland,
              SIAT is a rare breed. With a jack of all trades mindset, students
              are exposed to a variety of disciplines in their first and second
              years.
            </p>
          </section>
          <section
            id="act1"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            ref={viewRefs[1]}
          >
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act I</span>
              <h2 className="text-r-md">People</h2>
            </div>
            <VisContainer />
          </section>
          <section
            id="act2"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            ref={viewRefs[2]}
          >
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act II</span>
              <h2 className="text-r-md">Program</h2>
            </div>
            <VisContainer />
          </section>
          <section
            id="act3"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            ref={viewRefs[3]}
          >
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act III</span>
              <h2 className="text-r-md">Practice</h2>
            </div>
            <VisContainer />
          </section>
        </main>
      </div>
    </ReactLenis>
  );
}

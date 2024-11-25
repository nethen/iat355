// import Image from "next/image";
import { Grid } from "./components/Grid/Grid";
import Link from "next/link";
import ReactLenis from "lenis/react";
import { VisContainer } from "./components/Visualization/VisContainer";
import { Nav } from "./components/Nav/Nav";

export default function Home() {
  return (
    <ReactLenis root>
      <Grid />
      <div className="grid-r font-[family-name:var(--font-geist-sans)]">
        <Nav />
        <main className="max-md:pt-[5.625em] col-span-full py-[1.125em] md:py-[2.25em] md:col-span-5 lg:col-span-8 grid grid-cols-subgrid auto-rows-min min-h-[200svh] gap-y-[1.125em]">
          <section className="col-span-full grid grid-cols-subgrid gap-[inherit] pb-[4.5em]">
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <h2 className="text-r-md">Prologue</h2>
            </div>
            <VisContainer />
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3">
              When considering the design schools around the Lower Mainland,
              SIAT is a rare breed. With a jack of all trades mindset, students
              are exposed to a variety of disciplines in their first and second
              years.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3">
              When considering the design schools around the Lower Mainland,
              SIAT is a rare breed. With a jack of all trades mindset, students
              are exposed to a variety of disciplines in their first and second
              years.
            </p>
          </section>
          <section className="col-span-full grid grid-cols-subgrid gap-[inherit] pb-[4.5em]">
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act I</span>
              <h2 className="text-r-md">People</h2>
            </div>
            <VisContainer />
          </section>
          <section className="col-span-full grid grid-cols-subgrid gap-[inherit] pb-[4.5em]">
            <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act II</span>
              <h2 className="text-r-md">Program</h2>
            </div>
            <VisContainer />
          </section>
          <section className="col-span-full grid grid-cols-subgrid gap-[inherit] pb-[4.5em]">
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

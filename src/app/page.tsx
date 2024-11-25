import Image from "next/image";
import { Grid } from "./components/Grid/Grid";
import clsx from "clsx";
import Link from "next/link";
import ReactLenis from "lenis/react";
import { VisContainer } from "./components/Visualization/VisContainer";

export default function Home() {
  return (
    <ReactLenis root>
      <Grid />
      <div className="grid-r font-[family-name:var(--font-geist-sans)]">
        <nav className="fixed inset-x-0 py-[1.125em] md:py-[2.25em] max-md:grid-r md:sticky md:inset-y-0 md:h-svh flex flex-col max-md:bg-foreground max-md:text-background gap-y-[1.125em]">
          <Link href="/">
            <div className="font-bold">Prologue</div>
          </Link>
          <Link href="/">
            <div className="font-bold">Act I</div>
            <p>Population</p>
          </Link>
          <Link href="/">
            <div className="font-bold">Act II</div>
            <p>Program</p>
          </Link>
          <Link href="/">
            <div className="font-bold">Act III</div>
            <p>Practices</p>
          </Link>
          <Link href="/" className="mt-auto">
            <div className="font-bold">Sources</div>
          </Link>
        </nav>
        <main className="max-md:pt-[72px] col-span-full py-[1.125em] md:py-[2.25em] md:col-span-5 lg:col-span-8 grid grid-cols-subgrid auto-rows-min min-h-[200svh] gap-y-[1.125em]">
          <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
            <h2 className="text-r-md">Prologue</h2>
          </div>
          <VisContainer />
          <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3">
            When considering the design schools around the Lower Mainland, SIAT
            is a rare breed. With a jack of all trades mindset, students are
            exposed to a variety of disciplines in their first and second years.
          </p>
          <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3">
            When considering the design schools around the Lower Mainland, SIAT
            is a rare breed. With a jack of all trades mindset, students are
            exposed to a variety of disciplines in their first and second years.
          </p>
          <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
            <span className="font-bold">Act I</span>
            <h2 className="text-r-md">People</h2>
          </div>
          <VisContainer />
          <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
            <span className="font-bold">Act II</span>
            <h2 className="text-r-md">Program</h2>
          </div>
          <VisContainer />
          <div className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
            <span className="font-bold">Act III</span>
            <h2 className="text-r-md">Practice</h2>
          </div>
          <VisContainer />
        </main>
      </div>
    </ReactLenis>
  );
}

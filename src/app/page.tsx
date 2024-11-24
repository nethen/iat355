import Image from "next/image";
import { Grid } from "./components/Grid/Grid";
import clsx from "clsx";
import Link from "next/link";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root>
      <Grid />
      <div className="grid-r font-[family-name:var(--font-geist-sans)]">
        <nav className="fixed inset-x-0 max-md:grid-r md:sticky md:inset-y-0 md:h-svh flex flex-col bg-foreground text-background">
          <Link href="/">Prologue</Link>
          <Link href="/">Prologue</Link>
          <Link href="/">Prologue</Link>
          <Link href="/">Prologue</Link>
        </nav>
        <main className="col-span-full md:col-span-5 lg:col-span-8 grid grid-cols-subgrid auto-rows-min min-h-[200svh]">
          <h1 className="text-r-md">Population</h1>
          <p className="text-r-base">Act 1</p>
          <p className="text-r-base font-bold">Act 1</p>
        </main>
      </div>
    </ReactLenis>
  );
}

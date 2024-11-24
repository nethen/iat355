import Image from "next/image";
import { Grid, GRID_STYLE } from "./components/Grid/Grid";
import clsx from "clsx";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Grid />
      <div
        className={clsx(
          GRID_STYLE,
          "font-[family-name:var(--font-geist-sans)]"
        )}
      >
        <nav className="sticky inset-y-0 md:h-svh flex flex-col">
          <Link href="/">Prologue</Link>
          <Link href="/">Prologue</Link>
          <Link href="/">Prologue</Link>
          <Link href="/">Prologue</Link>
        </nav>
        <main className="col-span-full md:col-span-5 lg:col-span-8 grid grid-cols-subgrid min-h-[200svh]">
          <h1 className="text-r-md">Population</h1>
          <p className="text-r-base">Act 1</p>
          <p className="text-r-base font-bold">Act 1</p>
        </main>
      </div>
    </>
  );
}

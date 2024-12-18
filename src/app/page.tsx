// import Image from "next/image";
import { Grid } from "./components/Grid/Grid";
import { VisContainer } from "./components/Visualization/VisContainer";
import { ScrollyVisContainer } from "./components/Visualization/ScrollyVisContainer";
import { Nav } from "./components/Nav/Nav";
// import { createRef, useEffect, useState } from "react";
// import { useInView } from "motion/react";
import { Participants } from "./components/D3/prologue/Participants";
import { csvParse } from "d3";
import { promises as fs } from "fs";
import { SmoothScroll } from "./components/SmoothScroll/SmoothScroll";
import { PieAIUsage } from "./components/D3/prologue/PieAIUsage";
import { SectionPrologue } from "./components/Sections/SectionPrologue";
import { SectionSample } from "./components/Sections/SectionSample";
import { SectionStudyHabits } from "./components/Sections/SectionStudyHabits";
import { SectionResources } from "./components/Sections/SectionResources";
import { SectionAIUsage } from "./components/Sections/SectionAIUsage";
import { SectionTakeaways } from "./components/Sections/SectionTakeaways";
import { SectionSkills } from "./components/Sections/SectionSkills";

export default async function Home() {
  // const viewRefs = Array.from({ length: 4 }, () => createRef<HTMLDivElement>());

  // const isInView = [
  //   useInView(viewRefs[0]),
  //   useInView(viewRefs[1]),
  //   useInView(viewRefs[2]),
  //   useInView(viewRefs[3]),
  // ];

  const file = await fs.readFile(
    process.cwd() + "/public/siatData.csv",
    "utf8"
  );
  const data = await csvParse(file);

  // const [data, setData] = useState<DSVRowArray<string> | null>(null);

  // useEffect(() => {
  //   csv("/siatData.csv").then((data) => {
  //     setData(data);
  //   });
  // }, []);

  return (
    <SmoothScroll>
      <Grid />
      <div className="grid-r font-[family-name:var(--font-geist-sans)]">
        <header className="col-span-full min-h-[90svh] grid grid-cols-subgrid max-md:grid-rows-[min-content_auto] auto-rows-min gap-[1.125em] max-md:pt-[4.5em] max-md:pb-[2.25em]">
          <h1 className="col-span-full md:col-span-4 lg:col-span-6 text-r-sm sm:text-r-md lg:text-r-lg font-light">
            How do SIAT students perceive their visual design learning?
          </h1>
        </header>
        {/* <Nav sectionsInView={isInView} /> */}
        <Nav />
        <main className="col-span-full md:col-span-5 lg:col-span-8 grid grid-cols-subgrid auto-rows-min gap-y-[1.125em]">
          <SectionPrologue />
          <SectionSample data={data} />
          <SectionSkills data={data} />
          <SectionStudyHabits data={data} />
          <SectionResources data={data} />
          <SectionAIUsage data={data} />
          <SectionTakeaways />
        </main>
      </div>
    </SmoothScroll>
  );
}

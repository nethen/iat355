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
import { ParticipantsNew } from "./components/D3/prologue/ParticipantsNew";
import { SmoothScroll } from "./components/SmoothScroll/SmoothScroll";

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
        <header className="col-span-full min-h-[90svh] grid grid-cols-subgrid max-md:grid-rows-[min-content_auto] auto-rows-min gap-[1.125em] max-md:pt-[4.5em] max-md:pb-[2.25em] md:content-center">
          <h1 className="col-span-full md:col-start-3 md:col-span-4 lg:col-start-3 lg:col-span-5 text-m-lg sm:text-t-lg lg:text-r-lg">
            A Design Confidence Index
          </h1>
          <p className="max-md:mt-auto col-span-full md:col-start-3 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
            Insights on visual design competency and confidence within
            SFU&apos;s School of Interactive Arts and Technology.
          </p>
        </header>
        {/* <Nav sectionsInView={isInView} /> */}
        <Nav />
        <main className="col-span-full md:col-span-5 lg:col-span-8 grid grid-cols-subgrid auto-rows-min gap-y-[1.125em]">
          <section
            id="prologue"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
          >
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <h2 className="text-r-md">Prologue</h2>
            </hgroup>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              When considering the design schools around the Lower Mainland,
              SIAT is a rare breed. With a jack of all trades mindset, students
              are exposed to a variety of disciplines in their first and second
              years&mdash;rom foundational graphic, spatial and information
              design to more niche creative media and human computer
              interaction, the course offerings hope to provide a strong
              foundation for undergraduates to build their career off.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              Getting this foundation right is crucial as the digital products
              and artifacts that SIAT trains to produce only have 50
              milliseconds before users make first judgements of the credibility
              and quality, according to David Rhyne: a lead UX designer from
              Mastercard.
            </p>
            <VisContainer></VisContainer>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              The following narrative synthesizes behaviors based off poll
              results from 76 undergraduate students from Simon Fraser
              University’s School of Interactive Arts and Technology (SIAT). We
              asked the sample for insights into their perceptions and practices
              in visual design, creativity, and AI usage.
            </p>
          </section>
          <section
            id="act1"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            // ref={viewRefs[1]}
          >
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act I</span>
              <h2 className="text-r-md">People</h2>
            </hgroup>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              We gathered our sample by reaching out to students through
              Discord, Instagram, email, and put up posters around campus. As
              fourth year students, it was easier to get responses from contacts
              in similar years of study and in our immediate circles. We also
              reached out to first year reps and professors teaching lower
              division courses, in attempts for asking lower year students to
              balance the data set.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              After the data collection period ended, we recognized that the
              sample was skewed towards fourth and fifth year students making up
              almost half of the responses. Ideally we would have an even split,
              where there would be 1 in 5 students of each year.
            </p>
            <ScrollyVisContainer>
              <ParticipantsNew data={data} />
            </ScrollyVisContainer>

            <ScrollyVisContainer>
              <Participants data={data} />
            </ScrollyVisContainer>
          </section>
          <section
            id="act2"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            // ref={viewRefs[2]}
          >
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act II</span>
              <h2 className="text-r-md">Program</h2>
            </hgroup>
            <VisContainer />
          </section>
          <section
            id="act3"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            // ref={viewRefs[3]}
          >
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act III</span>
              <h2 className="text-r-md">Practice</h2>
            </hgroup>
            <VisContainer />
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}

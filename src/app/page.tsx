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
import { DotSample } from "./components/D3/prologue/DotSample";
import { SmoothScroll } from "./components/SmoothScroll/SmoothScroll";
import { AIusage } from "./components/D3/prologue/AIusage";
import { AIFreq } from "./components/D3/prologue/AIFreq";

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
            How AI affects visual design learning within SIAT.
          </h1>
          <p className="max-md:mt-auto col-span-full md:col-span-3 lg:col-span-3 md:col-start-1 lg:col-start-1 text-midground">
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
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 ">
              <h2 className="text-r-xs md:text-r-sm">Prologue</h2>
            </hgroup>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs md:text-r-sm">
              There is no question that artificial intelligence is changing the
              way we design.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3  text-midground">
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
              <h2 className="text-r-xs md:text-r-sm">People</h2>
            </hgroup>
            {/* <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
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
            </p> */}
            {/* <p className="text-r-sm col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              After reaching out to students through Discord, Instagram, email,
              and put up posters around campus, we collected 77 responses.
            </p> */}
            <ScrollyVisContainer
              background={false}
              height={400}
              captions={[
                {
                  title: "Sample",
                  text: "After reaching out to students through Discord, Instagram, email, and put up posters around campus, we collected 77 responses.",
                  stop: 0.25,
                },
                {
                  title: "Filter",
                  text: "Of the 77 responses, we focus on 40 students who have declared a concentration which heavily involves visual design.",
                  stop: 0.4,
                },
                {
                  title: "Skew",
                  text: "It should be noted that the sample is heavily skewed towards fourth and fifth year students, making up almost half of the responses.",
                  stop: 0.7,
                },
              ]}
            >
              <DotSample data={data} />
            </ScrollyVisContainer>

            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              A noticeable number of participants from the sample did not
              declare a concentration. This is to be expected though with around
              22 of the 30 undeclared students being lower year student, while
              the design concentrations being cleary the most popular.
            </p>
            <ScrollyVisContainer
              background={false}
              height={400}
              captions={[
                {
                  title: "Sample",
                  text: "From the 40 design students, we asked them to rate their confidence in their visual design skills on a 5 point Likert scale.",
                  stop: 0.25,
                },
              ]}
            >
              {/* <DotSample data={data} /> */}
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
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              To understand how much time students dedicate to honing their
              craft, we asked them how many hours a week they spend practicing
              outside of classwork. The majority reported spending just 1-3
              hours a week, with 4-6 hours being the second most common
              response. Beyond that, the time students commit varied more evenly
              across the higher ranges. While 1-3 hours might be reasonable
              given their packed schedules—balancing homework, jobs, and social
              lives—it&apos;s worth wondering if students wish they had more
              time to dedicate to their craft. It&apos;s possible that many feel
              their coursework is enough practice for now, but digging deeper
              could reveal whether they&apos;re truly satisfied with the time
              they spend improving their skills.
            </p>
            <ScrollyVisContainer>
              <Participants data={data} />
            </ScrollyVisContainer>
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

          <section className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]">
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <h2 className="text-r-md">Student sentiments toward AI</h2>
              <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
                out of our 76 particpants, 50 use ai with varying frequencies
                while the remaining 26 do not use AI at all for design related
                tasks.
              </p>
            </hgroup>

            {/* <ScrollyVisContainer background={true}>
              <AIusage data={data} />
            </ScrollyVisContainer> */}
          </section>
          {/* <ScrollyVisContainer background={true}>
            <AIFreq data={data} />
          </ScrollyVisContainer> */}
        </main>
      </div>
    </SmoothScroll>
  );
}

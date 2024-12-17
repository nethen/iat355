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
import { StackedBarConfidence } from "./components/D3/prologue/StackedBarConfidence";
// import { StackedBarConfidence } from "./components/D3/prologue/StackedBarConfidence";

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
              This exploration started with one question: how do students
              perceive their quality of education within SIAT?
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              As an interdisciplinary program, Simon Fraser University&apos;
              (SFU) curriculum within their School of Interactive Arts and
              Technology (SIAT) intends to cover a breadth of topics across
              design, human-computer interaction and media studies.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              Anecdotally, this variety of topics is intended for students to
              explore their interests and find their niche within their future
              industries. However, this may also lead to students feeling
              uncertain about their expertise and skillset.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 mb-[2.25em] text-midground">
              To explore more specific insights on this topic, we set out to
              survey fellow undergraduate students within SIAT. However, because
              of the aforementioned breadth of topics that SIAT provides, we
              were unsure of how to best approach this question.
            </p>

            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs md:text-r-sm">
              We began by framing our study on visual design competency and
              self-perceived confidence.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              To find gaps between the quality of education and how students
              felt about their prospects, we initially researched a variety of
              testing instruments.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              Because of this, it is uncertain whether or not the integrity of
              an undergraduate student&apos;s design process may be affected due
              to reliance on these tools.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              To better understand this landscape, we set out to survey fellow
              undergraduate students within Simon Fraser University&apos;s (SFU)
              School of Interactive Arts and Technology (SIAT). Data was
              collected through a questionnaire, focusing on visual design
              competency and confidence.
            </p>
          </section>
          <section
            id="act1"
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            // ref={viewRefs[1]}
          >
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 ">
              <span className="font-bold">Part I</span>
              <h2 className="text-r-xs md:text-r-sm">Sample</h2>
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
              height={800}
              captions={[
                {
                  title: "Sample",
                  text: "After reaching out to students through Discord, Instagram, email, and put up posters around campus, we collected 77 responses.",
                  stop: 0.1,
                },
                {
                  title: "Filter",
                  text: "Of the 77 responses, we focus on 40 students who have declared a concentration which heavily involves visual design.",
                  stop: 0.3,
                },
                {
                  title: "Skew",
                  text: "While concentrations are normally declared in third year, some second year students are certain that they will pursue a design concentration.",
                  stop: 0.5,
                },
                {
                  title: "Skew",
                  text: "Nevertheless, this sample is still skewed between third and fifth+ year students giving us clearer insight into senior SIAT views on visual design confidence.",
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
                {
                  title: "Sample",
                  text: (
                    <>
                      Based on their responses, we identified which skills that
                      the students felt either{" "}
                      <span className="text-blue-500">more</span> or{" "}
                      <span className="text-red-500">less</span> confident on
                      average.
                    </>
                  ),
                  stop: 0.5,
                },
              ]}
            >
              {/* <DotSample data={data} /> */}
            </ScrollyVisContainer>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
              When students claimed to be{" "}
              <span className="text-blue-500">more confident</span>, they tended
              to cite more higher-level skills (UX design, UI design, etc.)
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              Anecdotally, this is to be expected as SIAT&apos;s upper years,
              tend to focus on building digital products and artifacts. As a
              discipline, UI design incorporates visual design skills
            </p>
            <VisContainer></VisContainer>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
              When students claimed to be{" "}
              <span className="text-red-500">less confident</span>, less
              confident
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              When students reported lower confidence in more foundational
              graphic skills (typography, color, layout), it could suggest a
              lack of confidence in more expressive contexts like art direction
              and visual identity.
            </p>
            <VisContainer></VisContainer>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              When students reported lower confidence in more foundational
              graphic skills (typography, color, layout), it could suggest a
              lack of confidence in more expressive contexts like art direction
              and visual identity.
            </p>
          </section>
          <ScrollyVisContainer
              background={false}
              height={400}
              captions={[
                {
                  title: "Sample",
                  text: "In an effort to quantify and evaluate students visual design skills, we employed a Visual Aesthetic Sensity test, also known as VAST.",
                  stop: 0.1,
                },
                {
                  title: "Sample",
                  text: "During the test, Participants view pairs of visual stimuli (like shapes, drawings, or artwork variations), and they must judge which of the two is more aesthetically pleasing based on implicit artistic principles (e.g., balance, proportion).",
                  stop: 0.3,
                },
                {
                  title: "Skew",
                  text: "After analyzing the test results thoroughly we found no obvious correlations between VAST test scores and any other observed areas in the survey. ",
                  stop: 0.5,
                },
                {
                  title: "Skew",
                  text: "Nevertheless, this sample is still skewed between third and fifth+ year students giving us clearer insight into senior SIAT views on visual design confidence.",
                  stop: 0.7,
                },
              ]}
              
            >
              {/* <DotSample data={data} /> */}
              <Participants data={data} />
            </ScrollyVisContainer>
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
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 ">
              <span className="font-bold">Part III</span>
              <h2 className="text-r-xs md:text-r-sm">Supplements</h2>
            </hgroup>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs md:text-r-sm">
              There is no question that artificial intelligence is changing the
              way we design.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3  text-midground">
              Starting with early 2023 with the growth of ChatGPT, a wide array
              of generative AI tools have been gaining traction towards future
              optimizations to digital design pipelines. Look no further than{" "}
              <a
                href="https://openai.com/sora"
                target="_blank"
                className="text-blue-500"
              >
                OpenAI&apos;s own Sora
              </a>
              &mdash;an upcoming text-to-video software with the ability to edit
              and create entire sequences from a single prompt.
            </p>

            <VisContainer></VisContainer>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              Another tangible example of generative AI in the industry is
              illustrated by the web development for rising health startup{" "}
              <a
                href="https://superpower.com/"
                target="_blank"
                className="text-blue-500"
              >
                Superpower
              </a>
              , designed by Canadian studio{" "}
              <a
                href="https://daybreak.studio"
                target="_blank"
                className="text-blue-500"
              >
                Daybreak
              </a>{" "}
              with the help of Midjourney to storyboard a stunning series of
              motion design assets.
            </p>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground mb-[2.25em]">
              Even Figma having disrupted the design tool market with real-time
              collaboration, has implemented their own suite of generative AI
              features for brainstorming, summarization and copywriting.
            </p>

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

          <section
            className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
            // ref={viewRefs[2]}
          >
            <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
              <span className="font-bold">Act II</span>
              <h2 className="text-r-md">Program</h2>
            </hgroup>
            <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
              some copy here
            </p>
            <ScrollyVisContainer
              captions={[
                {
                  title: "Stacked Bar",
                  text: "This is a stacked bar chart",
                  stop: 0.125,
                },
                {
                  title: "Stacked Bar",
                  text: "It does magical things",
                  stop: 0.375,
                },
              ]}
            >
              <StackedBarConfidence data={data} />
            </ScrollyVisContainer>
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}

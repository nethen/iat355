import { BarConfident } from "../D3/prologue/BarConfident";
import { DotSample } from "../D3/prologue/DotSample";
import { Participants } from "../D3/prologue/Participants";
import { StackedBarConfidence } from "../D3/prologue/StackedBarConfidence";
import { VastHour } from "../D3/prologue/VastHour";
import { ScrollyVisContainer } from "../Visualization/ScrollyVisContainer";
import { VisContainer } from "../Visualization/VisContainer";

export const SectionSample = ({ data }: { data: any }) => {
  return (
    <section
      id="act1"
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
      // ref={viewRefs[1]}
    >
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
                Based on their responses, we identified which skills that the
                students felt either <span className="text-red-500">less</span>{" "}
                or <span className="text-blue-500">more</span> confident on
                average.
              </>
            ),
            stop: 0.5,
          },
        ]}
      >
        <StackedBarConfidence data={data} />
      </ScrollyVisContainer>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
        When students claimed to be{" "}
        <span className="text-blue-500">more confident</span>, they tended to
        cite more higher-level skills (UX design, UI design, etc.)
      </p>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
        This is to be expected as SIAT&apos;s upper years tend to focus on
        building digital products and artifacts. As a discipline, UI design
        incorporates visual design skills
      </p>
      <VisContainer>
        <BarConfident data={data} />
      </VisContainer>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
        When students claimed to be{" "}
        <span className="text-red-500">less confident</span>, less confident
      </p>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
        When students reported lower confidence in more foundational graphic
        skills (typography, color, layout), it could suggest a lack of
        confidence in more expressive contexts like art direction and visual
        identity.
      </p>
      <VisContainer></VisContainer>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground mb-[2.25em]">
        When students reported lower confidence in more foundational graphic
        skills (typography, color, layout), it could suggest a lack of
        confidence in more expressive contexts like art direction and visual
        identity.
      </p>

      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
        After asking students to rate their confidence, we tried to quantify
        their visual design competency by looking into several testing
        instruments.
      </p>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
        Designed by German-British psychologist, Hans Eysenck, the Visual
        Aesthetic Sensity Test (VAST) has now been determined to be a method of
        testing individual&apos;s ability to measure an image&apos;s adherence
        to external visual standards.
      </p>
      <VisContainer></VisContainer>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
        To see potential gaps in perceived and actual skill, we asked students
        to compare 25 images based visual guidelines set by 3 examples. The
        specific questions were taken from a revised version of the VAST by
        American psychologists Nils Myszkowski and Martin Storme.
      </p>

      <ScrollyVisContainer
        background={false}
        height={500}
        captions={[
          {
            title: "Skew",
            text: "We compared the VAST-R scores to the students' self-reported confidence scores. Here, larger dots represent higher counts of repeated results.",
            stop: 0.3,
          },
          {
            title: "Skew",
            text: "After thorough analysis, we found no obvious correlations between VAST-R test scores, as indicated by the scattering of points around mean VAST-R and reported confidences. ",
            stop: 0.5,
          },
          {
            title: "Skew",
            text: "In hopes of finding relatable insights, we tried comparing VAST-R scores against other variables.",
            stop: 0.7,
          },
        ]}
      >
        {/* <DotSample data={data} /> */}
        <Participants data={data} />
      </ScrollyVisContainer>

      {/* VAST-R vs Hours of Study */}
      <ScrollyVisContainer
        background={false}
        height={500}
        captions={[
          {
            title: "Skew",
            text: "For instance, we would imagine that students who spend more time studying would have higher VAST-R scores",
            stop: 0.3,
          },
          {
            title: "Skew",
            text: "After plotting each student, it could be argued that there is some relationship. However, many higher scores were achieved by students who reported spending less time studying.",
            stop: 0.5,
          },
          {
            title: "Skew",
            text: "What we do notice, is that out of the whole sample, the majority tends to only average 1-3 hours of extra visual design study per week.",
            stop: 0.7,
          },
        ]}
      >
        {/* <DotSample data={data} /> */}
        <VastHour data={data} />
      </ScrollyVisContainer>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
        Noting that student are not necessarily honing their visual design
        skills outside of coursework, we wondered if this had any effect on
        their outlook towards the SIAT program.
      </p>
    </section>
  );
};

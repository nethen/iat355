import { BarConfident } from "../D3/prologue/BarConfident";
import { BarUnconfident } from "../D3/prologue/BarUnconfident";
import { DotSample } from "../D3/prologue/DotSample";
import { Participants } from "../D3/prologue/Participants";
import { StackedBarConfidence } from "../D3/prologue/StackedBarConfidence";
import { VastHour } from "../D3/prologue/VastHour";
import { ScrollyVisContainer } from "../Visualization/ScrollyVisContainer";
import { VisContainer } from "../Visualization/VisContainer";

export const SectionSample = ({ data }: { data: any }) => {
  return (
    <section
      id="1"
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
    </section>
  );
};

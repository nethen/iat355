import { AIFreq } from "../D3/prologue/AIFreq";
import { AIusage } from "../D3/prologue/AIusage";
import { PieAIUsage } from "../D3/prologue/PieAIUsage";
import { ScrollyVisContainer } from "../Visualization/ScrollyVisContainer";

export const SectionAIUsage = ({ data }: { data: any }) => {
  return (
    <section
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
      // ref={viewRefs[2]}
    >
      <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-center">
        <span className="font-bold">Part IV</span>
        <h2 className="text-r-md">Program</h2>
      </hgroup>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
        some copy here
      </p>
      <ScrollyVisContainer background={true}>
        <AIusage data={data} />
      </ScrollyVisContainer>

      <ScrollyVisContainer background={true}>
        <AIFreq data={data} />
      </ScrollyVisContainer>
      <ScrollyVisContainer
        captions={[
          {
            title: "Stacked Bar",
            text: "In general, the majority of the 40 design students cited less frequent use of AI tools in their workflow.",
            stop: 0.125,
          },
          {
            title: "Stacked Bar",
            text: "It does magical things",
            stop: 0.375,
          },
        ]}
      >
        <PieAIUsage data={data} />
      </ScrollyVisContainer>
    </section>
  );
};

import { AIFreq } from "../D3/prologue/AIFreq";
import { AIusage } from "../D3/prologue/AIusage";
import { PieAIUsage } from "../D3/prologue/PieAIUsage";
import { ScrollyVisContainer } from "../Visualization/ScrollyVisContainer";

export const SectionAIUsage = ({ data }: { data: any }) => {
  return (
    <section
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
      id="5"
      // ref={viewRefs[2]}
    >
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs">
        With the rise of AI tools, we wanted to see how students were using them
        in their visual design workflow.
      </p>
      <ScrollyVisContainer
        height={400}
        background={false}
        captions={[
          {
            title: "Stacked Bar",
            text: "In general, the majority of the 40 design students cited less frequent use of AI tools in their visual design workflow.",
            stop: 0.25,
          },
          {
            title: "Stacked Bar",
            text: (
              <>
                In fact, only <span className="text-[#045a8d]">7 in 20</span>{" "}
                students claimed to use AI tools more than a few times a month,
                with weekly or daily usage for visual design tasks.
              </>
            ),
            stop: 0.5,
          },
          {
            title: "Stacked Bar",
            text: "This prompts us to wonder what the actual impact of AI tools is on SIAT students' processes.",
            stop: 0.75,
          },
        ]}
      >
        <PieAIUsage data={data} />
      </ScrollyVisContainer>
      <ScrollyVisContainer
        background={false}
        captions={[
          {
            title: "Stacked Bar",
            text: "After asking about their particular use cases for AI in their workflow, generating visual compositions or UI was not listed.",
            stop: 0.25,
          },
          {
            title: "Stacked Bar",
            text: "Instead, these AI tools were used at a higher level for generating and refining content.",
            stop: 0.5,
          },
        ]}
      >
        <AIusage data={data} />
      </ScrollyVisContainer>
    </section>
  );
};

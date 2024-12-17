import { Participants } from "../D3/prologue/Participants";
import { StudyExpectation } from "../D3/prologue/StudyExpectation";
import { ScrollyVisContainer } from "../Visualization/ScrollyVisContainer";

export const SectionStudyHabits = ({ data }: { data: any }) => {
  return (
    <section
      id="act2"
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
      // ref={viewRefs[2]}
    >
      <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 ">
        <span className="font-bold">Part II</span>
        <h2 className="text-r-xs md:text-r-sm">Study habits</h2>
      </hgroup>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground text-r-xs md:text-r-sm">
        Based on how often students are studying
      </p>
      <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground"></p>
      <ScrollyVisContainer
        captions={[
          {
            title: "Skew",
            text: "We compared the VAST-R scores to the students' self-reported confidence scores. Here, larger dots represent higher counts of repeated results.",
            stop: 0.3,
          },
        ]}
      >
        <Participants data={data} />
      </ScrollyVisContainer>
      <ScrollyVisContainer
        captions={[
          {
            title: "Skew",
            text: "We compared the VAST-R scores to the students' self-reported confidence scores. Here, larger dots represent higher counts of repeated results.",
            stop: 0.3,
          },
        ]}
      >
        <StudyExpectation data={data} />
      </ScrollyVisContainer>
    </section>
  );
};

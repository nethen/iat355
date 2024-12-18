import { Participants } from "../D3/prologue/Participants";
import { StudyExpectation } from "../D3/prologue/StudyExpectation";
import { ScrollyVisContainer } from "../Visualization/ScrollyVisContainer";

export const SectionStudyHabits = ({ data }: { data: any }) => {
  return (
    <section
      id="3"
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
      // ref={viewRefs[2]}
    >
      <ScrollyVisContainer
        background={false}
        captions={[
          {
            title: "Skew",
            text: (
              <>
                Based on the students' self-reported habits, we can also see
                that increased satisfaction with the program tends to result in{" "}
                <span className="font-bold">less extracurricular studies.</span>
              </>
            ),
            stop: 0.3,
          },
        ]}
      >
        <StudyExpectation data={data} />
      </ScrollyVisContainer>
    </section>
  );
};

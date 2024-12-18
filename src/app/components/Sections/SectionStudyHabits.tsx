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
      {/* <p className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 text-midground">
        Based on the students' self-reported habits, we can also see that
        increased satisfaction with the program tends to result in less
        extracurricular studies.
      </p> */}

      <ScrollyVisContainer
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

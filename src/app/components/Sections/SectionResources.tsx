import { VisContainer } from "../Visualization/VisContainer";

export const SectionResources = ({ data }: { data: any }) => {
  return (
    <section
      id="act3"
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
    >
      <VisContainer />
    </section>
  );
};

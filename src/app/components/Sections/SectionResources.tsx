import { VisContainer } from "../Visualization/VisContainer";

export const SectionResources = ({ data }: { data: any }) => {
  return (
    <section
      id="act3"
      className="col-span-full grid grid-cols-subgrid gap-[inherit] pt-[2.25em] pb-[4.5em]"
    >
      <hgroup className="col-span-full md:col-start-2 md:col-span-3 lg:col-start-3 lg:col-span-3 ">
        <span className="font-bold">Part III</span>
        <h2 className="text-r-xs md:text-r-sm">Specific tools</h2>
      </hgroup>
      <VisContainer />
    </section>
  );
};

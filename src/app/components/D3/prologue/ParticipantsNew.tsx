"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear, scaleSequential } from "d3-scale";
import { descending } from "d3-array";
import { interpolateCool } from "d3-scale-chromatic";

type D3VisProps = {
  data: DSVRowArray<string> | null;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const ParticipantsNew = ({
  data,
  width = 640,
  height = 500,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: D3VisProps) => {
  const scrollYProgress = useScrollYProgress();
  // const scale = useTransform(scrollYProgress, [0.25, 0.75], [0, 6]);
  const useScaleNew = (x: number) =>
    useTransform(
      scrollYProgress,
      [0.25 + (0.25 * x) / 69, 0.5 + (0.25 * x) / 69],
      [0, 6]
    );
  //   const [extents, setExtents] = useState<number[] | undefined[]>([
  //     undefined,
  //     undefined,
  //   ]);
  const y = scaleLinear()
    .domain([0, 7])
    .range([marginTop, height - marginBottom]); // Flip the range
  const x = scaleLinear()
    .domain([0, 8])
    .range([marginLeft, width - marginRight]);
  const c = scaleSequential(interpolateCool).domain([1, 5]);
  // .range(["blue", "red"]);

  console.log(x.ticks());

  //   useEffect(() => {
  //     console.log(data);
  //     if (data) {
  //       const extents = extent(data, (d) => parseInt(d.score.split(" ")[0]));
  //       console.log(extents);
  //       setExtents(extents);
  //     }
  //   }, [data]);

  return (
    <motion.svg
      width={width}
      height={height}
      className="w-full h-auto"
      animate={{ background: data ? "white" : "red" }}
    >
      {data &&
        data
          .sort((a, b) =>
            descending(parseInt(a.year_of_study), parseInt(b.year_of_study))
          )
          .map((d, i) => (
            <motion.circle
              cx={x(i % 9)}
              cy={y(Math.floor(i / 9))}
              fill={c(parseInt(d.year_of_study))}
              r={10}
              opacity={useScaleNew(i)}
              key={`participant-${i}`}
            />
          ))}
    </motion.svg>
  );
};

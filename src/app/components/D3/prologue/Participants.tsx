"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear } from "d3-scale";

type D3VisProps = {
  data: DSVRowArray<string> | null;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const Participants = ({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: D3VisProps) => {
  const scrollYProgress = useScrollYProgress();
  const scale = useTransform(scrollYProgress, [0.25, 0.75], [0, 8]);

  //   const [extents, setExtents] = useState<number[] | undefined[]>([
  //     undefined,
  //     undefined,
  //   ]);
  const x = scaleLinear()
    .domain([0, 1])
    .range([marginLeft, width - marginRight]);
  const y = scaleLinear()
    .domain([0, 35])
    .range([height - marginBottom, marginTop]);

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
      animate={{ background: data ? "blue" : "red" }}
    >
      {data &&
        data.map((d, i) => (
          <motion.circle
            cx={x(parseFloat(d.score_percent))}
            cy={y(parseFloat(d.visual_confidence_score))}
            fill="white"
            r={scale}
            key={`participant-${i}`}
          />
        ))}
    </motion.svg>
  );
};

"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear, scaleSequential } from "d3-scale";
import { descending } from "d3-array";
import { interpolateCool } from "d3-scale-chromatic";
import {
  useIsClient,
  useMediaQuery,
  useResizeObserver,
  useWindowSize,
} from "usehooks-ts";
import { useEffect, useMemo, useRef, useState } from "react";

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
  marginTop = 36,
  marginRight = 36,
  marginBottom = 36,
  marginLeft = 36,
}: D3VisProps) => {
  //   const [extents, setExtents] = useState<number[] | undefined[]>([
  //     undefined,
  //     undefined,
  //   ]);
  const isClient = useIsClient();
  const size = useWindowSize();
  const matches = useMediaQuery("(min-width: 1024px)");

  const containerRef = useRef(null);

  const rWidth = useResizeObserver({
    ref: containerRef,
    box: "border-box",
  }).width;

  useEffect(() => {
    console.log(rWidth);
  }, [rWidth]);

  const updatedSize = useMemo(() => {
    return {
      width: isClient ? size.width : width,
      height: Math.max(
        isClient ? (matches ? size.height - 144 : size.height - 216) : height,
        480
      ),
    };
  }, [size, isClient, matches]);

  const y = scaleLinear()
    .domain([0, 7])
    .range([marginTop, updatedSize.height - marginBottom]); // Flip the range
  const x = scaleLinear()
    .domain([0, 8])
    .range([marginLeft, rWidth ? rWidth - marginRight : width - marginRight]);
  const c = scaleSequential(interpolateCool).domain([1, 5]);
  // .range(["blue", "red"]);

  console.log(size);

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
      // viewBox={`0 0 ${isClient && size ? size.width : width} ${
      //   isClient && size ? size.height : height
      // }`}
      ref={containerRef}
      height={isClient && size ? updatedSize.height : height}
      className="w-full h-auto"
      animate={{ background: data ? "green" : "red" }}
    >
      {data &&
        data
          .sort((a, b) =>
            descending(parseInt(a.year_of_study), parseInt(b.year_of_study))
          )
          .map((d, i) => (
            <Circle
              x={x(i % 9)}
              y={y(Math.floor(i / 9))}
              fill={c(parseInt(d.year_of_study))}
              index={i}
              maxIndices={data.length}
              // opacity={opacity}
              key={`participant-${i}`}
            />
          ))}
    </motion.svg>
  );
};

const Circle = ({
  index,
  maxIndices,
  x,
  y,
  fill,
}: {
  index: number;
  maxIndices: number;
  x: number;
  y: number;
  fill: string;
}) => {
  const scrollYProgress = useScrollYProgress();
  const opacity = useTransform(
    scrollYProgress,
    [0.25 + (0.25 * index) / maxIndices, 0.5 + (0.25 * index) / maxIndices],
    [0, 1]
  );
  return <motion.circle cx={x} cy={y} fill={fill} r={10} opacity={opacity} />;
};

"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear, scaleSequential } from "d3-scale";
import { ascending } from "d3-array";
import { interpolateCustom } from "../../D3/Reusables/interpolateCustom";
import {
  useIsClient,
  useMediaQuery,
  useResizeObserver,
  useWindowSize,
} from "usehooks-ts";
import { useEffect, useMemo, useRef } from "react";

type D3VisProps = {
  data: DSVRowArray<string> | null;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  xLength?: number;
  yLength?: number;
};

export const ParticipantsNew = ({
  data,
  width = 640,
  height = 500,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
  xLength = 9,
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

  const DOT_RADIUS = matches && isClient ? 24 : 16;

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
    .domain([0, Math.floor(data ? data.length / xLength : 9)])
    .range([
      // DOT_RADIUS +
      //   Math.floor(data ? data.length / xLength : 9) * (DOT_RADIUS * -2) +
      -DOT_RADIUS * Math.floor(data ? data.length / xLength : 9) +
        updatedSize.height / 2,
      // -DOT_RADIUS +
      //   Math.floor(Math.floor(data ? data.length / xLength : 9) / 2) *
      //     (DOT_RADIUS * 2) +
      DOT_RADIUS * Math.floor(data ? data.length / xLength : 9) +
        updatedSize.height / 2,
    ]);

  const x = scaleLinear()
    .domain([0, xLength - 1])
    .range([
      rWidth
        ? (xLength % 2 === 0 ? DOT_RADIUS : 0) +
          Math.floor(xLength / 2) * -2 * DOT_RADIUS +
          rWidth / 2
        : marginLeft,
      rWidth
        ? (xLength % 2 === 0 ? -DOT_RADIUS : 0) +
          Math.floor(xLength / 2) * 2 * DOT_RADIUS +
          rWidth / 2
        : width - marginRight,
    ]);

  const c = scaleSequential(interpolateCustom()).domain([1, 5]);
  // .range(["blue", "red"]);

  console.log(size);

  return (
    <motion.svg
      // viewBox={`0 0 ${isClient && size ? size.width : width} ${
      //   isClient && size ? size.height : height
      // }`}
      ref={containerRef}
      height={isClient && size ? updatedSize.height : height}
      className="w-full h-auto"
      // animate={{ background: data ? "green" : "red" }}
    >
      {data &&
        data
          .sort((a, b) =>
            ascending(parseInt(a.year_of_study), parseInt(b.year_of_study))
          )
          .map((d, i) => (
            <Circle
              x={x(i % xLength)}
              y={y(Math.floor(i / xLength))}
              fill={c(parseInt(d.year_of_study))}
              index={i}
              maxIndices={data.length}
              radius={DOT_RADIUS}
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
  radius,
}: {
  index: number;
  maxIndices: number;
  x: number;
  y: number;
  fill: string;
  radius: number;
}) => {
  const scrollYProgress = useScrollYProgress();
  const opacity = useTransform(
    scrollYProgress,
    [0.25 + (0.25 * index) / maxIndices, 0.5 + (0.25 * index) / maxIndices],
    [0, 1]
  );
  return (
    <motion.circle cx={x} cy={y} fill={fill} r={radius} opacity={opacity} />
  );
};

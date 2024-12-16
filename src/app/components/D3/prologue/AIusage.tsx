"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleBand, scaleLinear, scaleSequential } from "d3-scale";
import { ascending, max } from "d3-array";
import { interpolateCustom } from "../Reusables/interpolateCustom";
import {
  useIsClient,
  useMediaQuery,
  useResizeObserver,
  useWindowSize,
} from "usehooks-ts";
import { useEffect, useMemo, useRef } from "react";
import { svg } from "d3";
import { g } from "motion/react-client";

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

export const AIusage = ({
  data,
  width = 640,
  height = 500,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
  xLength = 9,
}: D3VisProps) => {
  const dataCount = [
    { task: "Generate design ideas or concepts", value: 30 },
    { task: "Receiving Feedback", value: 16 },
    { task: "Copywriting", value: 7 },
    { task: "Image Generation", value: 6 },
    { task: "Generating or Refining Color Palettes", value: 4 },
    { task: "Learning", value: 2 },
    { task: "Coding", value: 1 },
  ];

  const yScale = scaleBand()
    .domain(dataCount.map((d) => d.task))
    .range([0, height - 20])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, max(dataCount, (d) => d.value) ?? 0])
    .range([0, width]);

  //   const [extents, setExtents] = useState<number[] | undefined[]>([
  //     undefined,
  //     undefined,
  //   ]);

  // const isClient = useIsClient();
  // const size = useWindowSize();
  // const matches = useMediaQuery("(min-width: 1024px)");

  // const containerRef = useRef(null);

  // const rWidth = useResizeObserver({
  //   ref: containerRef,
  //   box: "border-box",
  // }).width;

  return (
    <svg width={width + 400} height={height + 20}>
      <g transform={`translate(${300}, ${0})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <text style={{ textAnchor: "middle" }} fill="white" y={height + 12}>
              {tickValue}
            </text>

            <line
              y1={0}
              y2={height - 20}
              fill="white"
              stroke="white"
              opacity={0.1}
            />
          </g>
        ))}
        {yScale.domain().map((tickValue, index) => (
          <g
            key={index}
            transform={`translate(0, ${
              (yScale(tickValue) ?? 0) + yScale.bandwidth() / 2
            })`}
          >
            <text
              style={{ textAnchor: "end" }}
              fill="white"
              opacity={0.8}
              dy={".3em"}
              x={-12}
            >
              {tickValue}
            </text>
            <line y1={0} y2={height} fill="white" opacity={0.2} />
          </g>
        ))}

        {dataCount.map((d, index) => (
          <rect
            rx={4}
            ry={4}
            key={index}
            x={0}
            y={yScale(d.task)}
            width={xScale(d.value)}
            height={yScale.bandwidth()}
            fill="#b949ff"
          />
        ))}
      </g>
    </svg>
  );
};

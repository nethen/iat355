"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleBand, scaleLinear, scaleSequential } from "d3-scale";
import { ascending, max, bin } from "d3-array";
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

export const AIFreq = ({
  data,
  width = 640,
  height = 500,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
  xLength = 9,
}: D3VisProps) => {
  const categories = new Map<number, string>([
    [1, "never"],
    [2, "rarely"],
    [3, "monthly"],
    [4, "weekly"],
    [5, "daily"],
  ]);

  const binneddata = bin().value((d) => d["frequency_of_ai_tool_use"]);
  console.log(binneddata);

  const yScale = scaleBand()
    .domain(data ? data.map((d) => d.frequency_of_ai_tool_use) : "9")
    .range([0, height - 20])
    .paddingInner(0.2);

  const xScale = scaleLinear().domain([0, 30]).range([0, width]);

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
          <g
            key={`freq--${tickValue}`}
            transform={`translate(${xScale(tickValue)},0)`}
          >
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
              {categories.get(parseInt(tickValue)) ?? "Unknown"}
            </text>
            <line y1={0} y2={height} fill="white" opacity={0.2} />
          </g>
        ))}

        {/* {data? data.map((d, index) => (
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
        ))} */}
      </g>
    </svg>
  );
};

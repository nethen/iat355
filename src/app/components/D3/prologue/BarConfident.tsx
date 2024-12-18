"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import {
  useResizeObserverContext,
  useScrollYProgress,
} from "../../Visualization/ScrollyVisContainer";
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
import { useEffect, useMemo, useRef, useState } from "react";
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

export const BarConfident = ({
  data,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
  xLength = 9,
}: D3VisProps) => {
  const dataCount = [
    { task: "Prototyping", value: 27 },
    { task: "UX design", value: 21 },
    { task: "UI design", value: 21 },

    { task: "Layout", value: 19 },
    { task: "Typography", value: 16 },
    { task: "Color theory", value: 13 },
  ];

  const resizeObserver = useResizeObserverContext();

  const [{ width, height }, setSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // The code that checks how big the parent element is
  useResizeObserver({
    ref: resizeObserver || { current: null },
    box: "content-box",
    onResize: (entry) => {
      setSize({
        width: entry.width ?? 0,
        height: entry.height ?? 0,
      });
    },
  });

  const yScale = scaleBand()
    .domain(dataCount.map((d) => d.task))
    .range([0, height ? height - 40 : 0])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, max(dataCount, (d) => d.value) ?? 0])
    .range([width ? Math.max(width * 0.1, 120) : 0, width ? width - 20 : 0]);

  return (
    <svg className="w-full h-full">
      {/* <g transform={`translate(${300}, ${0})`}> */}

      {dataCount.map((d, index) => (
        <rect
          rx={4}
          ry={4}
          key={index}
          x={xScale(0)}
          y={yScale(d.task)}
          width={xScale(d.value) - xScale(0)}
          height={yScale.bandwidth()}
          fill="#b949ff"
        />
      ))}

      {xScale.ticks().map((tickValue) => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
          <text
            style={{ textAnchor: "middle" }}
            fill="rgb(var(--midground))"
            className="text-xs"
            y={height ? height - 20 : 0}
          >
            {tickValue}
          </text>

          <line
            y1={0}
            y2={height ?? 0 - 20}
            fill="white"
            stroke="rgb(var(--midground))"
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
            fill="rgb(var(--foreground))"
            opacity={0.8}
            className="text-xs"
            x={xScale(0) - 12}
          >
            {tickValue}
          </text>
          <line
            y1={0}
            y2={height ?? 0}
            fill="rgb(var(--midground))"
            opacity={0.2}
          />
        </g>
      ))}
    </svg>
  );
};

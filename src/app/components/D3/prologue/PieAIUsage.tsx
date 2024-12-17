"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import {
  useHasCaption,
  useResizeObserverContext,
  useScrollYProgress,
} from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear, scaleSequential } from "d3-scale";
import { ascending } from "d3-array";
import { interpolateCustom } from "../Reusables/interpolateCustom";
import {
  useIsClient,
  useMediaQuery,
  useResizeObserver,
  useWindowSize,
} from "usehooks-ts";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  arc,
  format,
  group,
  groups,
  pie,
  scaleOrdinal,
  schemeCategory10,
} from "d3";

// https://medium.com/stationfive/how-to-create-a-pie-chart-with-d3-js-and-react-hooks-part-1-81bcd7f39b32

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
  captions?: {
    title: string;
    text: string;
    stop: number;
  }[];
};

export const PieAIUsage = ({
  data,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
}: D3VisProps) => {
  const isClient = useIsClient();
  const size = useWindowSize();
  const captions = useHasCaption();
  const matchesXS = useMediaQuery("(min-width: 480px)");
  const matchesSM = useMediaQuery("(min-width: 640px)");
  const matches = useMediaQuery("(min-width: 1024px)");

  const arcNew = arc().innerRadius(50).outerRadius(100);
  const filteredData = data?.filter((d) => d.isDesign == "1");

  const filteredGroups = groups(filteredData ?? [], (d) =>
    parseInt(d.frequency_of_ai_tool_use)
  ).map((d) => {
    return {
      value: d[1].length,
      key: d[0],
    };
  });

  console.log(filteredGroups);

  const pieNew = pie().value((d) => d.length);

  const resizeObserver = useResizeObserverContext();

  const [{ width, height }, setSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: 0,
    height: 0,
  });

  // The code that checks how big the parent element is
  const sizeNew = useResizeObserver({
    ref: resizeObserver || { current: null },
    box: "content-box",
    onResize: (entry) => {
      setSize({
        width: entry.width,
        height: entry.height,
      });
      console.log(entry);
    },
  });

  const createPie = pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = arc()
    // .innerRadius(Math.min(width ?? 0, height ?? 0) * 0.25)
    .innerRadius(0)
    .outerRadius(Math.min(width ?? 0, height ?? 0) * 0.3);
  const colors = scaleOrdinal(schemeCategory10);
  const formatNew = format("i");
  const dataArc = createPie(filteredGroups);
  console.log(dataArc);

  return (
    <motion.svg
      width={isClient && sizeNew ? width : 0}
      height={isClient && sizeNew ? height : 0}
      className="w-full h-auto"
      // animate={{ background: data ? "green" : "red" }}
    >
      <g
        transform={`translate(${width ? width / 2 : 0}, ${
          height ? height / 2 : 0
        })`}
      >
        {dataArc.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
            format={formatNew}
            outerRadius={Math.min(width ?? 0, height ?? 0) * 0.4}
          />
        ))}
      </g>
    </motion.svg>
  );
};

const Arc = ({ data, index, createArc, colors, format, outerRadius }) => {
  const angle = data.startAngle + (data.endAngle - data.startAngle) / 2;
  // console.log(angle);
  const keys = ["Never", "Rarely", "Sometimes", "Often", "Always"];

  return (
    <g key={index} className="arc">
      <path className="arc" d={createArc(data)} fill={colors(index)} />
      <text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="10"
      >
        {format(data.value)}
      </text>
      <text
        transform={`translate(${Math.sin(angle) * outerRadius}, ${
          -Math.cos(angle) * outerRadius
        })`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="green"
        fontSize="20"
      >
        {keys[data.index]}
      </text>
    </g>
  );
};

"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import {
  useHasCaption,
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
import { useEffect, useMemo, useRef } from "react";
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
  width = 640,
  height = 500,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
}: D3VisProps) => {
  //   const [extents, setExtents] = useState<number[] | undefined[]>([
  //     undefined,
  //     undefined,
  //   ]);
  const usage = {
    no: 13,
    yes: 27,
  };

  const isClient = useIsClient();
  const size = useWindowSize();
  const captions = useHasCaption();
  const matchesXS = useMediaQuery("(min-width: 480px)");
  const matchesSM = useMediaQuery("(min-width: 640px)");
  const matches = useMediaQuery("(min-width: 1024px)");

  const containerRef = useRef(null);

  const rWidth = useResizeObserver({
    ref: containerRef,
    box: "border-box",
  }).width;

  const arcNew = arc().innerRadius(50).outerRadius(100);
  const filteredData = data?.filter((d) => d.isDesign == "1");

  const filteredGroups = groups(
    filteredData ?? [],
    (d) => parseInt(d.frequency_of_ai_tool_use) > 1
  ).map((d) => {
    return {
      value: d[1].length,
      key: d[0],
    };
  });

  console.log(filteredGroups);
  const pieNew = pie().value((d) => d.length);

  const DOT_RADIUS = isClient && matches ? 24 : isClient && matchesXS ? 16 : 12;
  const xLength = matchesSM && isClient ? 11 : 7;

  const updatedSize = useMemo(() => {
    return {
      width: isClient ? size.width : width,
      height: isClient
        ? matchesSM
          ? 7 * DOT_RADIUS * 2
          : 11 * DOT_RADIUS * 2
        : 11 * DOT_RADIUS * 2,
    };
  }, [size, isClient, matches]);

  const createPie = pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = arc().innerRadius(50).outerRadius(100);
  const colors = scaleOrdinal(schemeCategory10);
  const formatNew = format(".2f");
  const dataArc = createPie(filteredGroups);

  return (
    <motion.svg
      ref={containerRef}
      height={isClient && size ? updatedSize.height : height}
      className="w-full h-auto"
      // animate={{ background: data ? "green" : "red" }}
    >
      <g
        transform={`translate(${updatedSize.width / 2}, ${
          updatedSize.height / 2
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
          />
        ))}
      </g>
    </motion.svg>
  );
};

const Arc = ({ data, index, createArc, colors, format }) => (
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
  </g>
);

const Circle = ({
  index,
  maxIndices,
  x,
  y,
  fill,
  radius,
  conditions,
}: {
  index: number;
  maxIndices: number;
  x: number;
  y: number;
  fill: string;
  radius: number;
  conditions: number[];
}) => {
  const captions = useHasCaption();

  const stopDependentOpacityCurve = () => {
    if (captions) {
      return [0, captions[0].stop, captions[1].stop, captions[1].stop + 0.075];
    }
    return [
      0.1 + (0.1 * index) / maxIndices,
      0.25 + (0.25 * index) / maxIndices,
      0.6,
      0.8,
    ];
  };

  const opacityCurve = [0, 1, conditions[0], conditions[1] ? 1 : 0.1];
  const fillCurve = [
    fill,
    conditions[1] ? (conditions[1] == 2 ? fill : "#888888") : "#888888",
    conditions[1] ? (conditions[1] == 2 ? fill : "#888888") : "#888888",
    conditions[1] ? (conditions[1] == 2 ? "#888888" : "#00ccaa") : "#888888",
    conditions[1] ? (conditions[1] == 2 ? "#888888" : "#00ccaa") : "#888888",
  ];

  const scrollYProgress = useScrollYProgress();
  const opacity = useTransform(
    scrollYProgress,
    stopDependentOpacityCurve(),
    opacityCurve
  );

  const newFill = useTransform(
    scrollYProgress,
    captions
      ? [
          captions[1].stop + 0.1,
          captions[2].stop,
          captions[2].stop + 0.05,
          captions[3].stop,
          1,
        ]
      : [0.75, 0.875, 0.95, 1],
    fillCurve
  );

  return (
    <motion.circle cx={x} cy={y} fill={newFill} r={radius} opacity={opacity} />
  );
};

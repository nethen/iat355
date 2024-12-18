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

export const PieAIUsage = ({ data }: D3VisProps) => {
  const captions = useHasCaption();

  const filteredData = data?.filter((d) => parseInt(d.isDesign) == 1);

  const filteredGroups = groups(filteredData ?? [], (d) =>
    parseInt(d.frequency_of_ai_tool_use)
  ).map((d) => {
    return {
      value: d[1].length,
      key: d[0],
    };
  });

  const resizeObserver = useResizeObserverContext();

  const [{ width, height }, setSize] = useState<{
    width: number | undefined;
    height: number | undefined;
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
        width: entry.width,
        height: entry.height,
      });
      // console.log(entry);
    },
  });

  const createPie = pie()
    .value((d: any) => d.value)
    .sort(null);
  const createArc = arc()
    // .innerRadius(Math.min(width ?? 0, height ?? 0) * 0.25)
    .innerRadius(0)
    .outerRadius(Math.min(width ?? 0, height ?? 0) * 0.2);
  const colors = scaleOrdinal([
    "#f1eef6",
    "#bdc9e1",
    "#74a9cf",
    "#045a8d",
    "#2b8cbe",
  ]);
  const formatNew = format("i");
  const dataArc = createPie(
    filteredGroups.sort((a, b) => a.key - b.key) as any
  );
  // console.log(dataArc);

  const highlightAngle = dataArc[1].endAngle - dataArc[0].startAngle / 2;
  const scrollYProgress = useScrollYProgress();

  const scale = useTransform(
    scrollYProgress,
    [captions ? captions[1].stop : 0.1, captions ? captions[2].stop : 0.1],
    [1, 1.3]
  );

  return (
    <motion.svg className="w-full h-full">
      <g
        transform={`translate(${width ? width / 2 : 0}, ${
          height ? height / 2 : 0
        })`}
      >
        <motion.g style={{ scale: scale }}>
          {dataArc.map((d, i) => (
            <Arc
              key={i}
              data={d}
              index={i}
              createArc={createArc}
              colors={colors}
              format={formatNew}
              outerRadius={Math.min(width ?? 0, height ?? 0) * 0.3}
            />
          ))}
        </motion.g>
      </g>
    </motion.svg>
  );
};

const Arc = ({
  data,
  index,
  createArc,
  colors,
  format,
  outerRadius,
}: {
  data: any;
  index: number;
  createArc: any;
  colors: any;
  format: any;
  outerRadius: number;
}) => {
  const angle = data.startAngle + (data.endAngle - data.startAngle) / 2;
  // console.log(angle);
  const scrollYProgress = useScrollYProgress();
  const keys = ["Never", "Rarely", "Monthly", "Weekly", "Daily"];
  const captions = useHasCaption();
  const opacity = useTransform(
    scrollYProgress,
    [captions ? captions[0].stop : 0.1, captions ? captions[1].stop : 0.1],
    [1, 0]
  );
  const fillCurve = useTransform(
    scrollYProgress,
    [captions ? captions[0].stop : 0.1, captions ? captions[1].stop : 0.1],
    [colors(data.index), data.index < 2 ? colors(0) : colors(4)]
  );

  return (
    <g key={index} className="arc">
      <motion.path
        className="arc"
        d={createArc(data)}
        // fill={colors(index)}
        style={{ fill: fillCurve }}
      />
      <g
        transform={`translate(${Math.sin(angle) * outerRadius}, ${
          -Math.cos(angle) * outerRadius
        })`}
      >
        <motion.text
          textAnchor="start"
          alignmentBaseline="middle"
          fill="rgb(var(--midground))"
          fontSize="1em"
          style={{ opacity }}
          x={-16}
          y={-16}
        >
          {keys[data.index]}
        </motion.text>
        <motion.text
          textAnchor="start"
          alignmentBaseline="middle"
          fill="rgb(var(--midground))"
          fontSize="2em"
          style={{ opacity }}
          x={-16}
          y={16}
        >
          {format(data.value)}
        </motion.text>
      </g>
    </g>
  );
};

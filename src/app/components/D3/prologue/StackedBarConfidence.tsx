"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import {
  useHasCaption,
  useResizeObserverContext,
  useScrollYProgress,
} from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleBand, scaleLinear, scaleSequential } from "d3-scale";
import { ascending, filter, flatRollup, max, rollup } from "d3-array";
import { interpolateCustom } from "../Reusables/interpolateCustom";
import {
  group,
  index,
  stack,
  union,
  flatGroup,
  scaleOrdinal,
  stackOrderNone,
} from "d3";
import { useResizeObserver, useWindowSize } from "usehooks-ts";
import { useState } from "react";
import colors from "tailwindcss/colors";

type D3VisProps = {
  data: DSVRowArray<string>;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  xLength?: number;
  yLength?: number;
};

export const StackedBarConfidence = ({ data }: D3VisProps) => {
  const resizeObserver = useResizeObserverContext();
  const red = colors.red[500];
  const blue = colors.blue[500];

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
      // console.log(entry);
    },
  });
  const scrollYProgress = useScrollYProgress();
  const scale = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]);

  const skills_columns = [
    { field: "typography_skills", name: "Typography" },
    { field: "color_theory_skills", name: "Color Theory" },
    { field: "layout_composition_skills", name: "Layout" },

    { field: "ui_design_skills", name: "UI Design" },
    { field: "ux_design_skills", name: "UX Design" },
    { field: "prototyping_mockup_skills", name: "Prototyping" },
  ];

  // Optionally filter your data
  const filteredData = data.filter((row) => row.isDesign === "1"); // Filter by inDesign column

  // Initialize the result array
  const result: {
    skill_name: string;
    unconfident: number;
    neutral: number;
    confident: number;
  }[] = [];

  // Confidence categorization
  const categorizeConfidence = (level: string) => {
    const levelNum = parseInt(level, 10);
    if (levelNum <= 2) {
      return "Not Confident";
    } else if (levelNum === 3) {
      return "Neutral";
    } else {
      return "Confident";
    }
  };

  // Iterate over each skill column
  skills_columns.forEach((skill) => {
    // Initialize counts for the three categories
    const counts = {
      "Not Confident": 0,
      Neutral: 0,
      Confident: 0,
    };

    // Count occurrences for each category for the current skill
    filteredData.forEach((row) => {
      const confidenceLevel = row[skill.field];
      const category = categorizeConfidence(confidenceLevel);
      counts[category]++;
    });

    result.push({
      skill_name: skill.field,
      unconfident: counts["Not Confident"],
      neutral: counts["Neutral"],
      confident: counts["Confident"],
    });
  });

  const keys = ["unconfident", "neutral", "confident"];
  const newStack = stack().keys(keys).order(stackOrderNone);

  const series = newStack(result as Iterable<{ [key: string]: number }>);

  const yScale = scaleBand()
    .domain(result.map((d) => d.skill_name))
    .range([0, height ? height - 150 : 0])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, filteredData.length])
    .range([Math.max(0.1 * (width ?? 0), 120), width ?? 0]);

  const colorScale = scaleOrdinal()
    .domain(["unconfident", "neutral", "confident"])
    .range([red, "rgb(var(--midground) / 0.2)", blue]);
  // console.log(yScale.ticks());

  return (
    <svg className="w-full h-full">
      {/* Legend */}

      {/* Legend */}
      <g transform={`translate(${Math.max(0.1 * (width ?? 0), 120)}, 20)`}>
        {/* Legend Container */}
        {/* Unconfident */}
        <g transform="translate(0, 0)">
          <rect
            width={20}
            height={20}
            fill={colorScale("unconfident") as any}
            rx={4}
            ry={4}
          />
          <text
            x={30}
            y={15}
            fontSize={14}
            fontWeight="regular"
            fill="currentColor"
          >
            Not Confident
          </text>
        </g>
        {/* Neutral */}
        <g transform="translate(0, 30)">
          <rect
            width={20}
            height={20}
            fill={colorScale("neutral") as any}
            rx={4}
            ry={4}
          />
          <text
            x={30}
            y={15}
            fontSize={14}
            fontWeight="regular"
            fill="currentColor"
          >
            Neutral
          </text>
        </g>
        {/* Confident */}
        <g transform="translate(0, 60)">
          <rect
            width={20}
            height={20}
            fill={colorScale("confident") as any}
            rx={4}
            ry={4}
          />
          <text
            x={30}
            y={15}
            fontSize={14}
            fontWeight="regular"
            fill="currentColor"
          >
            Confident
          </text>
        </g>
      </g>

      {/* Main Visualization */}
      <g transform={`translate(0, ${120})`}>
        {" "}
        {/* Add offset to push main visualization down */}
        {/* Your existing visualization code */}
        {yScale.domain().map((tickValue, index) => (
          <g key={index} transform={`translate(0, ${yScale(tickValue) ?? 0})`}>
            <text
              style={{ textAnchor: "end" }}
              className="fill-midground select-none"
              opacity={0.8}
              dy={".3em"}
              fontSize={14}
              fontWeight={500}
              x={Math.max(0.1 * (width ?? 0), 120) - 16}
              y={yScale.bandwidth() / 2}
            >
              {skills_columns[index].name}
            </text>
            <line y1={0} y2={height} fill="green" opacity={0.2} />
          </g>
        ))}
        {series.map((Data) =>
          Data.map((d: any, i: any) => (
            <g key={`${Data.key}--${i}`}>
              <Bar
                x={xScale(d[0])}
                y={yScale(d.data.skill_name) ?? 0}
                width={xScale(d[1]) - xScale(d[0])}
                height={yScale.bandwidth()}
                fill={colorScale(Data.key) as any}
              />
              <motion.text
                className="fill-white z-40 text-[1rem] md:text-[1.5rem]"
                x={(xScale(d[0]) + xScale(d[1])) / 2}
                y={(yScale(d.data.skill_name) ?? 0) + yScale.bandwidth() / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
                opacity={scale}
              >
                {d[1] - d[0]}
              </motion.text>
            </g>
          ))
        )}
      </g>
    </svg>
  );
};

const Bar = ({
  x,
  y,
  width,
  height,
  fill,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}) => {
  const captions = useHasCaption();
  const scrollYProgress = useScrollYProgress();

  const positionWidthCurve = useTransform(
    scrollYProgress,
    captions ? [captions[0].stop, captions[1].stop] : [0, 0.5],
    [0, width]
  );

  return (
    <motion.rect
      x={x}
      y={y}
      width={positionWidthCurve}
      height={height}
      fill={fill}
    />
  );
};

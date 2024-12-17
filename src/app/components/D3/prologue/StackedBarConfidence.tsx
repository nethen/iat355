"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
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

export const StackedBarConfidence = ({
  data,
  width = 640,
  height = 500,
  // marginTop = 36,
  marginRight = 36,
  // marginBottom = 36,
  marginLeft = 36,
  xLength = 9,
}: D3VisProps) => {
  const skills_columns = [
    { field: "typography_skills", name: "Typography" },
    { field: "color_theory_skills", name: "Color Theory" },
    { field: "layout_composition_skills", name: "Layout Composition" },
    { field: "digital_illustration_skills", name: "Digital Illustration" },
    { field: "ui_design_skills", name: "UI Design" },
    { field: "ux_design_skills", name: "UX Design" },
    { field: "prototyping_mockup_skills", name: "Prototyping Mockup" },
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
  console.log(result);

  const keys = ["unconfident", "neutral", "confident"];
  const newStack = stack().keys(keys).order(stackOrderNone);

  const series = newStack(result);

  console.log(series);

  const yScale = scaleBand()
    .domain(result.map((d) => d.skill_name))
    .range([0, height - 20])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, filteredData.length])
    .range([0, width]);

  const colorScale = scaleOrdinal()
    .domain(["unconfident", "neutral", "confident"])
    .range(["#b949ff", "#000000", "#0000ff"]);

  return (
    <svg width={width + 400} height={height + 20}>
      {series.map((Data) =>
        Data.map((d, i) => (
          <rect
            x={xScale(d[0])}
            // y={0}
            y={yScale(d.data.skill_name)}
            key={`${Data.key}--${i}`}
            // x={D.}
            // y={yScale(d.skill_name)}
            width={xScale(d[1]) - xScale(d[0])}
            height={yScale.bandwidth()}
            // y={yScale(d.count)}
            // width={xScale(parseInt(d))}
            // height={yScale.bandwidth()}
            fill={colorScale(Data.key)}
          />
        ))
      )}
    </svg>
  );
};

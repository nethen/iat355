"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleBand, scaleLinear, scaleSequential } from "d3-scale";
import { ascending, filter, flatRollup, max, rollup } from "d3-array";
import { interpolateCustom } from "../Reusables/interpolateCustom";
import { group, index, stack, union, flatGroup } from "d3";

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

    // Push the results into the array
    // Object.keys(counts).forEach((confidenceLevel, index) => {
    //   result.push({
    //     skill_name: skill.field,
    //     unconfident:
    //     confidence_level: confidenceLevel,
    //     count:
    //       counts[confidenceLevel as "Not Confident" | "Neutral" | "Confident"],
    //   });
    // });
  });

  console.log(result);

  // const grouped = flatRollup(
  //   result,
  //   (D) => D.length,
  //   (d) => d.skill_name, // Key function
  //   (d) => d.confidence_level
  // );

  // console.log(grouped);

  // {
  //   name: "Brand 1",
  //   // type: 1,
  //   Not confidet: 10,
  //   neutrla: 20,
  //   Media: 30
  // },

  const keys = ["unonfident", "neutral", "confident"];
  const newStack = stack().keys(keys);

  const series = newStack(result);

  console.log(series);
  // const stackGenerator = stack().keys(union(result.map((d) => d.skill_name)));

  // const stacked = stack().keys(union(result.map((d) => d.skill_name)));
  //   .value(([, D], key) => D.get(key).count);
  // index(
  //   result,
  //   (d) => d.confidence_level,
  //   (d) => d.skill_name
  // );

  // console.log(stacked.keys);
  // console.log(stacked);
  // stacked()

  const yScale = scaleBand()
    .domain(skills_columns.map((d) => d.name))
    .range([0, height - 20])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, filteredData.length])
    .range([0, width]);

  return (
    <svg width={width + 400} height={height + 20}>
      <g transform={`translate(${300}, ${0})`}>
        {/* {xScale.ticks().map((tickValue) => (
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
        ))} */}
        {series.map((D) =>
          D.map((d, i) => (
            <rect
              rx={4}
              ry={4}
              // key={index}
              key={`${D.key}--${i}`}
              x={0}
              y={100}
              width={100}
              height={100}
              // y={yScale(d.count)}
              // width={xScale(parseInt(d))}
              // height={yScale.bandwidth()}
              fill="#b949ff"
            />
          ))
        )}

        {/* {grouped.map((d, index) =>
          d[1].map((d, index2) => (
            <rect
              rx={4}
              ry={4}
              key={index}
              x={0}
              y={yScale(d[0][1])}
              width={xScale(parseInt(d))}
              height={yScale.bandwidth()}
              fill="#b949ff"
            />
          ))
        )} */}
      </g>
    </svg>
  );
};
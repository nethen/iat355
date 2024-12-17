"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import {
  useHasCaption,
  useScrollYProgress,
} from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear } from "d3-scale";
import { useEffect } from "react";

type D3VisProps = {
  data: DSVRowArray<string> | null;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const Participants = ({
  data,
  width = 640,
  height = 500,
  marginTop = 50,
  marginBottom = 50,
  marginRight = 50,
  marginLeft = 50,
}: D3VisProps) => {
  const scrollYProgress = useScrollYProgress();
  const hasCaption = useHasCaption();
  const scale = useTransform(scrollYProgress, [0.25, 0.75], [0, 6]);

  const filteredData = data?.filter((row) => row.isDesign === "1"); // Filter by inDesign column

  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  const y = scaleLinear().domain([0, 1]).range([innerHeight, 0]); // Flip the range
  const x = scaleLinear().domain([0, 35]).range([0, innerWidth]);

  console.log(x.ticks());

  useEffect(() => {
    x.ticks(3);
  }, []);

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      animate={{
        background: filteredData ? (hasCaption ? "white" : "blue") : "red",
      }}
    >
      <g transform={`translate(${marginLeft},${marginTop})`}>
        <g>
          {y.ticks().map((tickValue) => (
            <g transform={`translate(0, ${y(tickValue)})`} key={tickValue}>
              <line
                stroke="lightgrey"
                x1={0}
                x2={innerWidth}
                y1={0}
                y2={0}
              />
              <text
                x={-5} // Adjust to position the text left of the axis
                y={0} // Keep aligned with the tick
                textAnchor="end" // Align text to the end of the position
                style={{ fontSize: "1rem", fill: "black" }}
              >
                {`${tickValue * 100}%`}
              </text>
            </g>
          ))}
        </g>

        <g>
          {x.ticks().map((tickValue) => (
            <g transform={`translate(${x(tickValue)},0)`} key={tickValue}>
              <line
                stroke="lightgrey"
                x1={0}
                x2={0}
                y1={0}
                y2={innerHeight}
              />
              <line stroke="lightgrey" x={0} y1={0} y2={0} />
              <text
                x={0} // Adjust to position the text left of the axis
                y={innerHeight + 20} // Keep aligned with the tick
                textAnchor="end" // Align text to the end of the position
                style={{ fontSize: "1rem", fill: "black", textAlign: "right" }}
              >
                {tickValue}
              </text>
            </g>
          ))}
        </g>


      {filteredData &&
        filteredData.map((d, i) => (
          <motion.circle
            cx={x(parseFloat(d.visual_confidence_score))}
            cy={y(parseFloat(d.score_percent))}
            fill="#1058c4"
            r={scale}
            key={`participant-${i}`}
          />
        ))}

</g>
    </motion.svg>
  );
};

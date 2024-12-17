"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import {
  useHasCaption,
  useResizeObserverContext,
  useScrollYProgress,
} from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear } from "d3-scale";
import { useEffect, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import { filter, mean } from "d3";

type D3VisProps = {
  data: DSVRowArray<string> | null;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const VastHour = ({
  data,
  marginTop = 100,
  marginBottom = 100,
  marginRight = 100,
  marginLeft = 100,
}: D3VisProps) => {
  const scrollYProgress = useScrollYProgress();
  const hasCaption = useHasCaption();
  const scale = useTransform(scrollYProgress, [0.25, 0.75], [0, 10]);

  const filteredData = data?.filter((row) => row.isDesign === "1"); // Filter by inDesign column

  const hourNames: string[] = [
    "",
    "0 hours",
    "1–3 hours",
    "4–6 hours",
    "7–10 hours",
    "11–15 hours",
    "16+ hours",
  ];

  const avgVast = mean(filteredData, (d) => d.score_percent);
  const avgVC = mean(filteredData, (d) => d.visual_confidence_score);

  const resizeObserver = useResizeObserverContext();
  const [{ innerWidth, innerHeight }, setSize] = useState<{
    innerWidth: number | undefined;
    innerHeight: number | undefined;
  }>({
    innerWidth: 0,
    innerHeight: 0,
  });

  // The code that checks how big the parent element is
  const sizeNew = useResizeObserver({
    ref: resizeObserver || { current: null },
    box: "content-box",
    onResize: (entry) => {
      setSize({
        innerWidth: entry.width ? entry.width - marginLeft - marginRight : 0,
        innerHeight: entry.height ? entry.height - marginTop - marginBottom : 0,
      });
      console.log(entry);
    },
  });

  const y = scaleLinear()
    .domain([0, 1])
    .range([innerHeight ?? 0, 0]); // Flip the range

  const x = scaleLinear()
    .domain([0, hourNames.length])
    .range([0, innerWidth ?? 0]);

  // Calculate frequency of (score_percent, visual_confidence_score) pairs
  const frequencyMap = new Map<string, number>();
  filteredData?.forEach((d) => {
    const key = `${d.score_percent},${d.hours_per_week_visual_design}`;
    frequencyMap.set(key, (frequencyMap.get(key) || 0) + 1);
  });

  // Function to calculate size based on frequency
  const getSizeBasedOnFrequency = (d: any, i : number) => {
    const key = `${d.score_percent},${d.hours_per_week_visual_design}`;
    const frequency = frequencyMap.get(key) || 1; // Default to 1 if frequency is not found
    return Math.min(10 + frequency * 5, 20); // Scale size based on frequency (capped at 50)
  };

  return (
    <motion.svg
      className="w-full h-full"
      width={innerWidth + marginRight + marginLeft}
      height={innerHeight + marginTop + marginBottom}
      animate={{
        background: filteredData
          ? hasCaption
            ? "transparent"
            : "blue"
          : "red",
      }}
    >
      <g transform={`translate(${marginLeft},${marginTop})`}>
        <g>

          <text
            x={innerWidth / 2} // Adjust to position the text left of the axis
            y={innerHeight + 60} // Keep aligned with the tick
            textAnchor="middle" // Align text to the end of the position
            // style={{ fontSize: "3rem", fill: "black" }}
            className="text-[2rem] fill-midground"
          >
            Time spent learning outside of school
          </text>
          <text
            x={-70} // Adjust to position the text left of the axis
            y={-70} // Keep aligned with the tick
            textAnchor="center" // Align text to the end of the position
            // style={{ fontSize: "3rem", fill: "black" }}
            className="text-[2rem] fill-midground"
            transform={`translate(0,${innerHeight / 2}) rotate(270)`}
          >
            Vast Score
          </text>

          {y.ticks().map((tickValue) => (
            <g transform={`translate(0, ${y(tickValue)})`} key={tickValue}>
              <line stroke="gray" x1={0} x2={innerWidth} y1={0} y2={0} className="opacity-50" />
              <text
                x={-5} // Adjust to position the text left of the axis
                y={0} // Keep aligned with the tick
                textAnchor="end" // Align text to the end of the position
                className="text-[1rem] fill-midground"
              >
                {`${tickValue * 100}%`}
              </text>
            </g>
          ))}
        </g>

        <g>
          {x.ticks(5).map((tickValue, index) => (
            <g transform={`translate(${x(tickValue)},0)`} key={tickValue}>
              <line stroke="gray" x1={0} x2={0} y1={0} y2={innerHeight} className="opacity-50" />
              {/* <line stroke="gray" x={0} y1={0} y2={0} /> */}
              <text
                x={0} // Adjust to position the text left of the axis
                y={innerHeight + 20} // Keep aligned with the tick
                textAnchor="middle" // Align text to the end of the position
                className="text-[1rem] fill-midground"
              >
                {hourNames[index ]}
              </text>
            </g>
          ))}
        </g>

        {filteredData &&
          filteredData.map((d, i) => (
            <motion.circle
              cx={x(parseFloat(d.hours_per_week_visual_design)+1)}
              cy={y(parseFloat(d.score_percent))}
              fill="#1058c4"
              opacity={0.5}
              r={useTransform(
                scrollYProgress,
                [0.25, 0.75],
                [0, getSizeBasedOnFrequency(d,i)]
              )}
              key={`participant-${i}`}
            />
          ))}
      </g>
    </motion.svg>
  );
};

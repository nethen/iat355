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

export const StudyExpectation = ({
  data,
  marginTop = 100,
  marginBottom = 100,
  marginRight = 50,
  marginLeft = 150,
}: D3VisProps) => {
  const scrollYProgress = useScrollYProgress();
  const hasCaption = useHasCaption();
  const scale = useTransform(scrollYProgress, [0.25, 0.75], [0, 10]);

  const filteredData = data?.filter((row) => row.isDesign === "1"); // Filter by inDesign column

  const expectationNames: string[] = [
    "0",
    "Far below",
    "Somewhat below",
    "meeting",
    "somewhat exceeds",
    "far exceeds",
  ];

  const hourNames: string[] = [
    "",
    "0 hours",
    "1–3 hours",
    "4–6 hours",
    "7–10 hours",
    "11–15 hours",
    "16+ hours",
  ];

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
    .domain([0, 6])
    .range([innerHeight ?? 0, 0]); // Flip the range

  const x = scaleLinear()
    .domain([0, 5])
    .range([0, innerWidth ?? 0]);



 // Calculate frequency of (score_percent, visual_confidence_score) pairs
 const frequencyMap = new Map<string, number>();

 filteredData?.forEach((d) => {
   const key = `${d.score_percent},${d.visual_confidence_score}`;
   frequencyMap.set(key, (frequencyMap.get(key) || 0) + 1);
 });
 console.log(frequencyMap)

 const getSizeBasedOnFrequency = (d: any) => {
   const id = `${d.score_percent},${d.visual_confidence_score}`;
   const frequency = frequencyMap.get(id) || 1; // Default frequency to 1
 
   // Safely cap the scaling factor to a reasonable limit
   const screenScaleFactor = Math.min(
     Math.min(innerWidth ?? 0, 1200) / 1200, // Cap width scaling at 1
     Math.min(innerHeight ?? 0, 800) / 800   // Cap height scaling at 1
   );
 
   // Apply scaling factor with a proper cap for size
   const scaledSize = Math.min(frequency * 3, 20); // Base scaling (cap at 20)
   return 5 + scaledSize * screenScaleFactor; // Final size with screen scaling
 };



 const Circle = ({ cx, cy, d }: { cx: number; cy: number, d:any }) => {

   console.log(getSizeBasedOnFrequency(d))
   const radius = useTransform(
     scrollYProgress,
     [0.25, 0.5],
     [0, getSizeBasedOnFrequency(d)]
   );
   return (
     <motion.circle cx={cx} cy={cy} fill="#1058c4" opacity={0.75} r={radius} />
   );
 };
 

  return (
    <motion.svg
      className="w-full h-full"
      width={innerWidth ? innerWidth + marginRight + marginLeft : 0}
      height={innerHeight ? innerHeight + marginTop + marginBottom : 0}
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
            y={innerHeight + marginBottom/1.25} // Keep aligned with the tick
            textAnchor="middle" // Align text to the end of the position
            // style={{ fontSize: "3rem", fill: "black" }}
            className="text-[2rem] fill-midground"
          >
            Does SIAT meet your expectations for learning visual design? 
          </text>
          <text
            x={-70} // Adjust to position the text left of the axis
            y={-70} // Keep aligned with the tick
            textAnchor="middle" // Align text to the end of the position
            // style={{ fontSize: "3rem", fill: "black" }}
            className="text-[2rem] fill-midground"
            transform={`translate(${-marginLeft/4},${innerHeight / 2.5}) rotate(270)`}
          >
            Time spent learning outside of school 
          </text>

          {y.ticks(6).map((tickValue,index) => (
            <g transform={`translate(0, ${y(tickValue)})`} key={tickValue}>
              <line
                stroke="gray"
                x1={0}
                x2={innerWidth}
                y1={0}
                y2={0}
                className="opacity-50"
              />
              <text
                x={-5} // Adjust to position the text left of the axis
                y={0} // Keep aligned with the tick
                textAnchor="end" // Align text to the end of the position
                className="text-[1rem] fill-midground"
              >
                {hourNames[index]}
              </text>
            </g>
          ))}
        </g>

        <g>
          {x.ticks(5).map((tickValue, index) => (
            <g transform={`translate(${x(tickValue)},0)`} key={tickValue}>
              <line
                stroke="gray"
                x1={0}
                x2={0}
                y1={0}
                y2={innerHeight}
                className="opacity-50"
              />
              {/* <line stroke="gray" x={0} y1={0} y2={0} /> */}
              <text
                x={0} // Adjust to position the text left of the axis
                y={innerHeight + 20} // Keep aligned with the tick
                textAnchor="middle" // Align text to the end of the position
                className="text-[1rem] fill-midground"
              >
                {expectationNames[index]}
              </text>
            </g>
          ))}
        </g>
        hours_per_week_visual_design
        {filteredData &&
          filteredData.map((d, i) => (
            <Circle
              cx={x(parseFloat(d.visual_design_expectations) )}
              cy={y(parseFloat(d.hours_per_week_visual_design) + 1 )}
              d={d}
              key={`participant-${i}`}
            />
          ))}
      </g>
    </motion.svg>
  );
};

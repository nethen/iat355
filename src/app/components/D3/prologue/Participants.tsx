"use client";
import { motion, useTransform } from "motion/react";
// import { useEffect, useState } from "react";
import { useScrollYProgress } from "../../Visualization/ScrollyVisContainer";
import { DSVRowArray } from "d3-dsv";
import { scaleLinear } from "d3-scale";

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
  // marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}: D3VisProps) => {
  const scrollYProgress = useScrollYProgress();
  const scale = useTransform(scrollYProgress, [0.25, 0.75], [0, 6]);

  //   const [extents, setExtents] = useState<number[] | undefined[]>([
  //     undefined,
  //     undefined,
  //   ]);
  const y = scaleLinear().domain([0, 1]).range([height, 40]); // Flip the range
  const x = scaleLinear()
    .domain([0, 35])
    .range([marginLeft, width - marginRight]);

  console.log(x.ticks());

  //   useEffect(() => {
  //     console.log(data);
  //     if (data) {
  //       const extents = extent(data, (d) => parseInt(d.score.split(" ")[0]));
  //       console.log(extents);
  //       setExtents(extents);
  //     }
  //   }, [data]);

  return (
    <motion.svg
      width={width}
      height={height}
      className="w-full h-auto"
      animate={{ background: data ? "white" : "red" }}
    >
      <g>
        {y.ticks().map((tickValue) => (
          <g transform={`translate(0, ${y(tickValue)})`} key={tickValue}>
            <line
              stroke="lightgrey"
              x1={marginLeft + 40}
              x2={width + 50}
              y1={0}
              y2={0}
            />
            <text
              x={marginLeft + 20} // Adjust to position the text left of the axis
              y={0} // Keep aligned with the tick
              textAnchor="end" // Align text to the end of the position
              style={{ fontSize: "1rem", fill: "black" }}
            >
              {tickValue * 100}
            </text>
          </g>
        ))}
      </g>

      <g>
        {x.ticks().map((tickValue) => (
          <g transform={`translate(${x(tickValue)},0)`} key={tickValue}>
            <line stroke="lightgrey" x={marginLeft} y1={0} y2={0} />
            <text
              x={marginLeft + 20} // Adjust to position the text left of the axis
              y={height + marginBottom} // Keep aligned with the tick
              textAnchor="end" // Align text to the end of the position
              style={{ fontSize: "1rem", fill: "black" }}
            >
              {tickValue}
            </text>
          </g>
        ))}
      </g>
      {data &&
        data.map((d, i) => (
          <motion.circle
            cx={x(parseFloat(d.visual_confidence_score))}
            cy={y(parseFloat(d.score_percent))}
            fill="#000422"
            r={scale}
            key={`participant-${i}`}
          />
        ))}
    </motion.svg>
  );
};

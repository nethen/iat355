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

export const DotSample = ({
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

  const y = scaleLinear()
    .domain([0, Math.floor(data ? data.length / xLength : 11)])
    .range([
      -DOT_RADIUS * Math.floor(data ? data.length / xLength : 11) +
        DOT_RADIUS +
        updatedSize.height / 2,

      DOT_RADIUS * Math.floor(data ? data.length / xLength : 11) +
        DOT_RADIUS +
        updatedSize.height / 2,
    ]);

  const x = scaleLinear()
    .domain([0, xLength - 1])
    .range([
      rWidth
        ? (xLength % 2 === 0 ? DOT_RADIUS : 0) +
          Math.floor(xLength / 2) * -2 * DOT_RADIUS +
          rWidth / 2
        : marginLeft,
      rWidth
        ? (xLength % 2 === 0 ? -DOT_RADIUS : 0) +
          Math.floor(xLength / 2) * 2 * DOT_RADIUS +
          rWidth / 2
        : width - marginRight,
    ]);

  const scrollYProgress = useScrollYProgress();
  const opacity = useTransform(
    scrollYProgress,
    [captions ? captions[0].stop : 1, captions ? captions[1].stop : 1],
    [1, 0.2]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [
      captions ? captions[0].stop : 1,
      captions ? captions[1].stop : 1,
      captions ? captions[1].stop + 0.1 : 1,
      captions ? captions[2].stop : 1,
      captions ? captions[2].stop + 0.1 : 1,
      captions ? captions[3].stop : 1,
    ],
    [1, 1, 1, 0.2, 0.2, 1]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [
      captions ? captions[0].stop : 1,
      captions ? captions[1].stop : 1,
      captions ? captions[1].stop + 0.1 : 1,
      captions ? captions[2].stop : 1,
      captions ? captions[2].stop + 0.1 : 1,
      captions ? captions[3].stop : 1,
    ],
    [1, 1, 1, 1, 0.2, 0.2]
  );
  const fillNew = useTransform(
    scrollYProgress,
    [captions ? captions[3].stop : 1, 1],
    ["#6cb3d3", "#6cb3d3"]
  );
  const c = scaleSequential(interpolateCustom()).domain([1, 5]);

  return (
    <motion.svg
      ref={containerRef}
      height={isClient && size ? updatedSize.height : height}
      className="w-full h-auto"
      // animate={{ background: data ? "green" : "red" }}
    >
      <g>
        {data &&
          data
            .sort((a, b) =>
              ascending(parseInt(a.year_of_study), parseInt(b.year_of_study))
            )
            .map((d, i) => (
              <Circle
                x={x(i % xLength)}
                y={y(Math.floor(i / xLength))}
                fill={c(parseInt(d.year_of_study))}
                index={i}
                maxIndices={data.length}
                radius={DOT_RADIUS}
                conditions={[
                  d.isDesign == "1" ? 1 : 0.1,
                  d.isDesign == "1"
                    ? parseInt(d.year_of_study) < 3
                      ? 2
                      : 1
                    : 0,
                ]}
                // opacity={opacity}
                key={`participant-${i}`}
              />
            ))}
      </g>
      <g>
        {[1, 2, 3, 4, 5].map((d, i) => (
          <motion.text
            x={
              rWidth
                ? DOT_RADIUS * 1.5 +
                  (xLength % 2 === 0 ? -DOT_RADIUS : 0) +
                  Math.floor(xLength / 2) * 2 * DOT_RADIUS +
                  rWidth / 2
                : width - marginRight
            }
            y={y(i)}
            fill={c(i + 1)}
            className="font-bold"
            style={{ opacity: i < 1 ? opacity : i > 1 ? opacity2 : opacity3 }}
            key={`participants-new__label-${i}`}
          >
            Year {i + 1}
          </motion.text>
        ))}
      </g>
    </motion.svg>
  );
};

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
    conditions[1] ? (conditions[1] == 2 ? "#888888" : fill) : "#888888",
    conditions[1] ? (conditions[1] == 2 ? "#888888" : fill) : "#888888",
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

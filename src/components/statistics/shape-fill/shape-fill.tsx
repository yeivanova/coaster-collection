import React, { FC, useRef, useEffect, ReactNode, useState } from "react";
import styles from "./shape-fill.module.scss";
import cn from "classnames";
import { v4 as uuid } from "uuid";
import * as d3 from "d3";
import { COLOR } from "src/utils/constants";

type TShapeFillProps = {
  shape: "circle" | "square" | "other";
  width: number;
  height: number;
  children: ReactNode;
  percent: number;
  inView: boolean;
};

const squareRadius = 7.7697,
  strokeWidth = 4.5;

const countToPercent = (id: string, numberStr: number) => {
  d3.select(id)
    .transition()
    .delay(300)
    .tween("text", () => {
      const interpolator = d3.interpolateNumber(numberStr / 2, numberStr);
      return function (t: number) {
        d3.select(this).text(+interpolator(t).toFixed(1) + "%");
      };
    })
    .duration(1000);
};

export const ShapeFill: FC<TShapeFillProps> = ({
  children,
  shape,
  width,
  height,
  percent,
  inView,
}) => {
  const elementId = `text-${uuid().slice(0, 8)}`;
  const ref = useRef<SVGSVGElement>(null);
  const [heightFilledArea, setHeightFilledArea] = useState(0);

  useEffect(() => {
    setHeightFilledArea(+Number((percent * height) / 100).toFixed(2));
  }, [percent, height]);

  useEffect(() => {
    if (inView) {
      countToPercent("#" + elementId, percent);
    }
  }, [inView, percent]);

  useEffect(() => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      svgElement.selectAll("g").remove();
      if (heightFilledArea !== 0) {
        svgElement
          .attr("viewBox", `0 0 ${width} ${height}`)
          .append("g")
          .attr("class", "shape")
          .append("mask")
          .attr("id", elementId)
          .attr("style", "mask-type:alpha")
          .attr("maskUnits", "userSpaceOnUse")
          .attr("x", strokeWidth / 2)
          .attr("y", height - heightFilledArea)
          .attr("width", width - strokeWidth)
          .attr("height", heightFilledArea)
          .append("rect")
          .style(
            "transform",
            "translateY(" +
              (2 * height - heightFilledArea - strokeWidth) +
              "px) scaleY(-1)"
          )
          .attr("fill", "#ffffff")
          .attr("x", strokeWidth / 2)
          .attr("y", height - heightFilledArea)
          .attr("width", width - strokeWidth)
          .attr("height", 0)
          .transition()
          .ease(d3.easeCubicOut)
          .delay(300)
          .duration(2000)
          .attr("height", heightFilledArea);
      }

      if (inView) {
        if (shape === "square") {
          svgElement
            .selectAll(".shape")
            .attr("mask", `url(#${elementId})`)
            .append("rect")
            .attr("x", strokeWidth / 2)
            .attr("y", strokeWidth / 2)
            .attr("width", width - strokeWidth)
            .attr("height", height - strokeWidth)
            .attr("rx", squareRadius)
            .attr("fill", COLOR);
        }
        if (shape === "circle") {
          svgElement
            .selectAll(".shape")
            .attr("mask", `url(#${elementId})`)
            .append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", width / 2)
            .attr("fill", COLOR);
        }
        if (shape === "other") {
          svgElement
            .selectAll(".shape")
            .attr("mask", `url(#${elementId})`)
            .append("path")
            .attr(
              "d",
              "M184.427 10.3264C192.432 0.391628 207.568 0.39164 215.573 10.3265L279.894 90.1492C282.118 92.9083 285.034 95.0273 288.345 96.2891L384.137 132.795C396.06 137.339 400.737 151.734 393.762 162.418L337.723 248.257C335.785 251.224 334.671 254.653 334.495 258.192L329.376 360.577C328.739 373.32 316.494 382.216 304.178 378.884L205.223 352.113C201.802 351.188 198.198 351.188 194.777 352.113L95.8216 378.884C83.5055 382.216 71.2606 373.319 70.6236 360.577L65.5054 258.192C65.3285 254.653 64.2145 251.224 62.2775 248.257L6.23783 162.418C-0.736919 151.734 3.94023 137.339 15.8626 132.795L111.655 96.2891C114.966 95.0273 117.882 92.9083 120.106 90.1492L184.427 10.3264Z"
            )
            .attr("fill", COLOR);
        }
      }
    }
  }, [inView, percent, width, height, heightFilledArea, shape]);
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        ref={ref}
        className={cn(
          styles.shape_svg,
          shape === "square"
            ? styles.square
            : shape === "circle"
            ? styles.circle
            : styles.other
        )}
      >
        {shape === "square" && (
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={width - strokeWidth}
            height={height - strokeWidth}
            rx={squareRadius}
            stroke={COLOR}
            strokeWidth={strokeWidth}
          />
        )}
        {shape === "circle" && (
          <circle
            cx={width / 2}
            cy={height / 2}
            r={width / 2 - strokeWidth / 2}
            stroke={COLOR}
            strokeWidth={strokeWidth}
          />
        )}
        {shape === "other" && (
          <path
            d="M184.427 10.3264C192.432 0.391628 207.568 0.39164 215.573 10.3265L279.894 90.1492C282.118 92.9083 285.034 95.0273 288.345 96.2891L384.137 132.795C396.06 137.339 400.737 151.734 393.762 162.418L337.723 248.257C335.785 251.224 334.671 254.653 334.495 258.192L329.376 360.577C328.739 373.32 316.494 382.216 304.178 378.884L205.223 352.113C201.802 351.188 198.198 351.188 194.777 352.113L95.8216 378.884C83.5055 382.216 71.2606 373.319 70.6236 360.577L65.5054 258.192C65.3285 254.653 64.2145 251.224 62.2775 248.257L6.23783 162.418C-0.736919 151.734 3.94023 137.339 15.8626 132.795L111.655 96.2891C114.966 95.0273 117.882 92.9083 120.106 90.1492L184.427 10.3264Z"
            stroke={COLOR}
            strokeWidth={strokeWidth}
          />
        )}
        <text
          id={elementId}
          className={styles.percent}
          x="50%"
          y="33%"
          dominantBaseline="middle"
          textAnchor="middle"
        ></text>
      </svg>
      {children}
    </>
  );
};

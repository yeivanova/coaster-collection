import React, { FC, useRef, useEffect, ReactNode, useState } from "react";
import styles from "./glass-fill.module.scss";
import { v4 as uuid } from "uuid";
import * as d3 from "d3";
import { COLOR, ALE_COLOR } from "src/utils/constants";

type TGlassFillProps = {
  type: "ale" | "lager";
  width: number;
  height: number;
  children: ReactNode;
  percent: number;
  inView: boolean;
};

const strokeWidth = 4;

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

export const GlassFill: FC<TGlassFillProps> = ({
  children,
  type,
  width,
  height,
  percent,
  inView,
}) => {
  const elementId = uuid().slice(0, 8);
  const ref = useRef<SVGSVGElement>(null);
  const [heightFilledArea, setHeightFilledArea] = useState(0);

  useEffect(() => {
    setHeightFilledArea(+Number((percent * height) / 100).toFixed(2));
  }, [percent, height]);

  useEffect(() => {
    if (inView) {
      countToPercent("#text-" + elementId, percent);
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
          .attr("class", "glass")
          .append("mask")
          .attr("id", `glass-${elementId}`)
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
        svgElement
          .selectAll(".glass")
          .attr("mask", `url(#glass-${elementId})`)
          .append("path")
          .attr(
            "d",
            "M36.3043 283.1C21.0043 109.5 23.1043 120.3 17.5043 106.7C3.40429 72.2 13.2043 64.6 14.8043 45.6H157.904C159.804 68 169.604 71.3 154.704 107.8C152.204 113.9 150.604 120.7 150.004 128C135.504 294.5 137.204 284.9 134.504 284.9C32.2043 284.9 36.5043 285.7 36.3043 283.1Z"
          )
          .attr("fill", type === "ale" ? ALE_COLOR : COLOR);
      }
    }
  }, [inView, percent, heightFilledArea, type]);
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        ref={ref}
        className={styles.glass_svg}
      >
        <path fill="white" fillOpacity="0.2" stroke="white" strokeWidth={strokeWidth}
          d="M169.211 9.30486L169.211 9.30561C168.98 11.6754 168.76 13.8903 168.553 15.9686C166.543 36.2064 165.821 43.477 168.351 54.4445C173.336 76.3574 171.639 86.9122 168.541 95.6838C167.768 97.8721 166.878 100.007 165.957 102.215C163.157 108.933 160.07 116.338 159.108 128.036C155.55 170.74 152.984 202.545 151.073 226.232C149.063 251.151 147.777 267.086 146.823 277.276C146.358 282.241 145.974 285.812 145.626 288.38C145.274 290.983 144.973 292.435 144.706 293.238C144.684 293.304 144.663 293.362 144.644 293.413C144.477 293.405 144.272 293.397 144.082 293.4H29.6015C29.4335 293.4 29.2485 293.41 29.0896 293.421C29.0747 293.38 29.0589 293.334 29.0424 293.284C28.777 292.482 28.4775 291.029 28.1259 288.425C27.7789 285.855 27.3953 282.282 26.9303 277.314C25.9467 266.805 24.6112 250.189 22.5003 223.924C20.6163 200.484 18.1148 169.36 14.6946 128.035L14.6946 128.034C14.0806 120.667 12.542 113.759 9.94981 107.536C5.29925 96.1843 2.83829 89.1117 2.18088 81.8204C1.52402 74.5352 2.65552 66.8769 5.55013 54.3503L5.55222 54.341C8.07872 43.1662 7.29251 35.5331 5.0423 13.6867C4.89777 12.2835 4.74719 10.8216 4.59106 9.29634L4.58952 9.28132L4.58776 9.26632C4.13209 5.39315 7.16021 2 11.2015 2H162.601C166.519 2 169.596 5.3803 169.211 9.30486ZM144.493 293.743C144.493 293.743 144.495 293.739 144.501 293.732C144.496 293.74 144.493 293.743 144.493 293.743ZM29.2513 293.785C29.2513 293.786 29.2486 293.782 29.2436 293.774C29.2489 293.781 29.2514 293.785 29.2513 293.785Z"          
        />
        <path opacity="0.2" d="M36.3043 283.1C21.0043 109.5 23.1043 120.3 17.5043 106.7C3.40429 72.2 13.2043 64.6 14.8043 45.6H157.904C159.804 68 169.604 71.3 154.704 107.8C152.204 113.9 150.604 120.7 150.004 128C135.504 294.5 137.204 284.9 134.504 284.9C32.2043 284.9 36.5043 285.7 36.3043 283.1Z" fill={type === "ale" ? ALE_COLOR : COLOR}/>
        <text
          id={`text-${elementId}`}
          className={styles.percent}
          x="50%"
          y="33%"
          fontSize="34"
          dominantBaseline="middle"
          textAnchor="middle"
        ></text>
      </svg>
      {children}
    </>
  );
};

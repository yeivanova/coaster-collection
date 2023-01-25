import React, { FC, useRef, useEffect, ReactNode } from "react";
import styles from "./donut-chart.module.scss";
import { v4 as uuid } from "uuid";
import * as d3 from "d3";
import { PieArcDatum } from "d3";

type TDonutChartProps = {
  children: ReactNode;
  percent: number;
  inView: boolean;
};

const width = 475,
  height = 475,
  margin = 40;
const radius = Math.min(width, height) / 2 - margin;

const countToPercent = (id: string, numberStr: number) => {
  d3.select(id)
    .transition()
    .delay(300)
    .tween("text", () => {
      const interpolator = d3.interpolateNumber(numberStr / 2, numberStr);
      return function (t: number) {
        d3.select(this).text(+interpolator(t).toFixed(2) + "%");
      };
    })
    .duration(1000);
};

export const DonutChart: FC<TDonutChartProps> = ({
  children,
  percent,
  inView,
}) => {
  const elementId = `text-${uuid().slice(0, 8)}`;
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (inView) {
      countToPercent("#" + elementId, percent);
    }
  }, [inView, percent, elementId]);

  useEffect(() => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);

      svgElement
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radius * 0.96)
        .attr("stroke", "#F7AD2A")
        .style("stroke-width", "5px")
        .attr("fill", "transparent");

      const color = d3.scaleOrdinal().range(["#F7AD2A", "transparent"]);
      const pie = d3.pie().value(function (d) {
        return +d;
      });

      const data_ready = pie([percent, 100 - percent]);
      const arc = d3
        .arc<PieArcDatum<number | { valueOf(): number }>>()
        .innerRadius(radius * 0.8)
        .outerRadius(radius + margin / 2).startAngle(0);

      if (inView) {
        svgElement
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .selectAll("allSlices")
          .data(data_ready)
          .enter()
          .append("path")
          .transition()
          .duration(1750)
          .delay(500)
          .attrTween("d", (d) => {
            const interpolate = d3.interpolate(
              0,
              (percent / 100) * Math.PI * 2
            );
            return (t: number) => {
              d.endAngle = interpolate(t);
              return arc(d)!;
            };
          })

          // @ts-ignore
          .attr("fill", function (d) {
            return color(d.data.toString());
          });
      }
    }
  }, [inView, percent]);
  return (
    <>
      <svg ref={ref} className={styles.donut_svg}>
        <text
          id={elementId}
          className={styles.percent}
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        ></text>
      </svg>
      {children}
    </>
  );
};

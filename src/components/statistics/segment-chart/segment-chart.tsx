import { FC, useRef, useEffect, ReactNode } from "react";
import styles from "./segment-chart.module.scss";
import { v4 as uuid } from "uuid";
import * as d3 from "d3";
import { COLOR } from "src/utils/constants";

type TSegmentChartProps = {
  children: ReactNode;
  percent: number;
  radius: number;
  strokeWidth: number;
  inView: boolean;
};

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

export const SegmentChart: FC<TSegmentChartProps> = ({
  children,
  percent,
  radius,
  strokeWidth,
  inView,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const innerRadius = radius - strokeWidth / 2;
  const diameter = radius * 2 + strokeWidth;
  const circleStrokeWidth = Math.min(radius / 40, 5);
  const circleRadius = innerRadius + circleStrokeWidth;
  const elementId = `text-${uuid().slice(0, 8)}`;

  useEffect(() => {
    if (inView) {
      countToPercent("#" + elementId, percent);
    }
  }, [inView, percent]);

  useEffect(() => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      svgElement.selectAll("g").remove();
      svgElement
        .attr("viewBox", `0 0 ${diameter} ${diameter}`)
        .append("g")
        .attr("class", "chart")
        .attr(
          "transform",
          "translate(" + diameter / 2 + "," + diameter / 2 + ")"
        )
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", circleRadius)
        .attr("stroke", COLOR)
        .style("stroke-width", `${circleStrokeWidth}px`)
        .attr("fill", "transparent");

      const color = d3.scaleOrdinal().range([COLOR, "transparent"]);
      const pie = d3.pie().value((d) => +d);

      const data_ready = pie([percent, 100 - percent]);
      const arc = d3
        .arc<d3.PieArcDatum<number | { valueOf(): number }>>()
        .innerRadius(radius - strokeWidth - circleStrokeWidth)
        .outerRadius(diameter / 2)
        .startAngle(0);

      if (inView) {
        svgElement
          .selectAll(".chart")
          .attr(
            "transform",
            "translate(" + diameter / 2 + "," + diameter / 2 + ")"
          )
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

          .attr("fill", (d): string => color(d.data.toString()) as string);
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
          fontSize="60"
          dominantBaseline="middle"
          textAnchor="middle"
        ></text>
      </svg>
      {children}
    </>
  );
};

import React, { FC, useRef, useEffect, ReactNode } from "react";
import styles from "./donut-chart.module.scss";
import { v4 as uuid } from "uuid";
import * as d3 from "d3";
import { COLOR, OUTLINE_WIDTH } from "src/utils/constants";
import { TChartData } from "src/services/types";

type TDonutChartProps = {
  children: ReactNode;
  percent: number;
  data: TChartData[];
  radius: number;
  strokeWidth: number;
  inView: boolean;
};

const elementId = `text-${uuid().slice(0, 8)}`;
const elementLabelId = `text-label-${uuid().slice(0, 8)}`;

function hightlightArc(thisArc: SVGPathElement) {
  d3.selectAll(`.${styles.path}`).classed(styles.active, false);
  d3.select(thisArc).classed(styles.active, true);
  const data = d3
    .select<SVGPathElement, d3.PieArcDatum<TChartData>>(thisArc)
    .datum().data;
  d3.select("#" + elementLabelId).text(data.label);
  d3.select("#" + elementId).text(data.value + "%");
}

export const DonutChart: FC<TDonutChartProps> = ({
  children,
  percent,
  data,
  radius,
  strokeWidth,
  inView,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const innerRadius = radius - strokeWidth / 2;
  const diameter = radius * 2 + strokeWidth;
  const dataValues = [] as number[];
  Object.values(data).map((el) => dataValues.push(+el.value));

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
        );

      const color = d3
        .scaleOrdinal()
        .range(new Array(dataValues.length).fill(COLOR));
      const pie = d3
        .pie<TChartData>()
        .sort(null)
        .value(function (d) {
          return d.value;
        });

      const data_ready = pie(data);
      const arc = d3
        .arc<d3.PieArcDatum<TChartData>>()
        .innerRadius(innerRadius * 0.85)
        .outerRadius(radius + strokeWidth / 2);

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
          .attr("class", styles.path)
          .attr("d", arc)
          .attr("stroke", "#000000")
          .style("stroke-width", `${OUTLINE_WIDTH}px`)
          .attr("fill", function (d): string {
            return color(d.data.toString()) as string;
          })
          .on("mouseover", function () {
            hightlightArc(this);
          });

        // init the first sector by default
        const pathElement = svgElement.selectAll(`.${styles.path}`).node();
        hightlightArc(pathElement as SVGPathElement);
      }
    }
  }, [inView, percent]);
  return (
    <>
      <svg ref={ref} className={styles.donut_svg}>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="56"
          id={elementLabelId}
          className={styles.percent_label}
        ></text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="60"
          id={elementId}
          className={styles.percent}
        ></text>
      </svg>
      {children}
    </>
  );
};

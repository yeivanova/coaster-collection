import React, { FC, useRef, useEffect } from "react";
import styles from "./horizontal-bar-chart.module.scss";
import cn from "classnames";
import * as d3 from "d3";
import { COLOR, OUTLINE_WIDTH } from "../../../utils/constants";
import { TChartData } from "../../../services/types";

type THorizontalBarChartProps = {
  data: TChartData[];
  width: number;
  height: number;
  inView: boolean;
};

function hightlightSector(thisPath: SVGPathElement) {
  d3.selectAll(`.${styles.active}`).classed(styles.active, false);
  thisPath?.parentElement?.classList.add(styles.active);
  d3.select(thisPath).classed(styles.active, true);
}

export const HorizontalBarChart: FC<THorizontalBarChartProps> = ({
  data,
  width,
  height,
  inView,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const outlineWidthInPercent = (OUTLINE_WIDTH * 100) / width;

  useEffect(() => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      svgElement.selectAll("g").remove();

      svgElement.attr("viewBox", `0 0 ${width} ${height}`);

      let prevElWidth = 0;

      data.forEach((el) => {
        const group = svgElement.append("g").attr("class", styles.label_group);

        group
          .append("rect")
          .attr("class", styles.rect)
          .attr("x", `${prevElWidth}%`)
          .attr("y", "80%")
          .attr("width", `${el.value - outlineWidthInPercent}%`)
          .attr("height", "20%")
          .attr("fill", COLOR)
          .on("mouseover", function () {
            hightlightSector(this);
          });

        group
          .append("text")
          .attr("class", cn(styles.percent, styles.label_element))
          .attr("x", `${prevElWidth + el.value / 2}%`)
          .attr("y", "20%")
          .text(`${el.value}%`);

        group
          .append("rect")
          .attr("class", cn(styles.line, styles.label_element))
          .attr("x", `${prevElWidth + el.value / 2}%`)
          .attr("y", "50%")
          .attr("width", "1px")
          .attr("height", "20px")
          .attr("fill", COLOR);

        prevElWidth = prevElWidth + el.value;
      });

      const rectElement = svgElement.selectAll(`.${styles.rect}`).node();
      hightlightSector(rectElement as SVGPathElement);
    }
  }, [inView, width, height]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      ref={ref}
      className={styles.svg}
    ></svg>
  );
};

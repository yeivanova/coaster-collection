import React, { FC, useRef, useEffect, ReactNode } from "react";
import styles from "./vertical-bar-chart.module.scss";
import cn from "classnames";
import * as d3 from "d3";
import { COLOR, OUTLINE_WIDTH } from "../../../utils/constants";
import { TChartData } from "../../../services/types";

type TVerticalBarChartProps = {
  children: ReactNode;
  data: TChartData[];
  width: number;
  height: number;
  percent: number;
  inView: boolean;
};

function hightlightSector(thisPath: SVGPathElement) {
  d3.selectAll(`.${styles.active}`).classed(styles.active, false);
  thisPath.parentElement?.classList.add(styles.active);
  d3.select(thisPath).classed(styles.active, true);
}

export const VerticalBarChart: FC<TVerticalBarChartProps> = ({
  children,
  data,
  width,
  height,
  percent,
  inView,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const outlineWidthInPercent = (OUTLINE_WIDTH * 100) / height;
  const barWidth = width / 5;

  useEffect(() => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      svgElement.selectAll("g").remove();

      svgElement.attr("viewBox", `0 0 ${width} ${height}`);

      let prevElHeight = 0,
        figure = "",
        figureScale = "0.5";

      data.forEach((el) => {
        const group = svgElement.append("g").attr("class", styles.label_group);

        group
          .append("rect")
          .attr("class", styles.rect)
          .attr("x", `${(width - barWidth) / 2}`)
          .attr("y", `${prevElHeight}%`)
          .attr("width", `${barWidth}px`)
          .attr("height", `${el.value - outlineWidthInPercent / 2}%`)
          .attr("fill", COLOR)
          .on("mouseover", function () {
            hightlightSector(this);
          });

        group
          .append("text")
          .attr("class", cn(styles.label, styles.label_element))
          .attr("x", `${(width - barWidth) / 2 + barWidth + 60}px`)
          .attr("y", `${prevElHeight + el.value / 2}%`)
          .text(el.label);

        group
          .append("text")
          .attr("class", cn(styles.percent, styles.label_element))
          .attr("x", "25px")
          .attr("y", `${prevElHeight + el.value / 2}%`)
          .text(`${el.value}%`);

        if (el.label === "Шестигранник") {
          figure =
            "M4.28492 16.855L29.2151 2.6055C30.6023 1.79817 32.3568 1.79817 33.7441 2.6055L58.7151 16.855C60.1023 17.6624 61 19.156 61 20.7303V49.2294C61 50.844 60.1432 52.2972 58.7151 53.1046L33.7849 67.3945C32.3976 68.2018 30.6432 68.2018 29.2559 67.3945L4.28492 53.145C2.89765 52.3376 2 50.844 2 49.2697V20.7303C2 19.156 2.85685 17.6624 4.28492 16.855Z";
        }

        if (el.label === "Ромб") {
          figure =
            "M33.5064 71.3328L3.66715 41.4936C1.44428 39.2708 1.44428 35.6916 3.66715 33.5064L33.5064 3.66715C35.7292 1.44428 39.3084 1.44428 41.4936 3.66715L71.3328 33.5064C73.5557 35.7292 73.5557 39.3084 71.3328 41.4936L41.4936 71.3328C39.2708 73.5557 35.6916 73.5557 33.5064 71.3328Z";
        }

        if (el.label === "Овал") {
          figure =
            "M43 55C65.6437 55 84 43.1355 84 28.5C84 13.8645 65.6437 2 43 2C20.3563 2 2 13.8645 2 28.5C2 43.1355 20.3563 55 43 55Z";
          figureScale = "0.45";
        }

        if (el.label === "Другое") {
          figure =
            "M30.5332 64.6762C29.5887 65.1079 28.4867 65.1079 27.5028 64.6762C24.3937 63.3026 17.0734 59.2603 11.2487 50.0376C8.0215 44.3469 4.95171 36.0268 3.57425 29.4728C2.27549 23.2719 2.03936 17.9345 2 16.09C2 15.5405 2.31485 15.0303 2.78712 14.7949C3.29875 14.5594 4.12523 14.2847 5.42399 14.0884C7.66729 13.696 9.51703 12.2439 9.51703 10.0069C9.51703 9.7714 9.51703 9.53593 9.47768 9.3397C9.28089 8.24082 9.91059 7.18118 10.9339 6.78872L22.4652 2.23621C23.8427 1.68677 25.4169 2.11848 26.2828 3.29585C26.9125 4.15926 27.8964 4.74794 29.0377 4.74794C30.1397 4.74794 31.1236 4.15926 31.7926 3.29585C32.6585 2.11848 34.2327 1.68677 35.6102 2.23621L47.0628 6.71023C48.0861 7.10269 48.7158 8.16232 48.519 9.26121C48.4797 9.49668 48.4797 9.69291 48.4797 9.92838C48.4797 12.2046 50.3688 13.6567 52.5727 14.0099C53.8715 14.2454 54.6979 14.4809 55.2096 14.7164C55.7212 14.9518 56.036 15.462 55.9967 16.0115C55.9573 17.8953 55.7212 23.2327 54.4224 29.3943C53.045 35.9483 49.9752 44.2684 46.748 49.9591C40.9233 59.2603 33.6424 63.3026 30.5332 64.6762Z";
          figureScale = "0.55";
        }

        if (figure !== "") {
          group
            .append("path")
            .attr("class", styles.label_element)
            .style(
              "transform",
              `translate(${(width - barWidth) / 2 + barWidth + 15}px, ${
                prevElHeight + el.value / 2 - 3
              }%) scale(${figureScale})`
            )
            .attr("d", figure)
            .attr("stroke", COLOR)
            .style("stroke-width", "3px")
            .attr("stroke-miterlimit", "10");
        }

        prevElHeight = prevElHeight + el.value + outlineWidthInPercent;
      });

      const rectElement = svgElement.selectAll(`.${styles.rect}`).node();
      hightlightSector(rectElement as SVGPathElement);
    }
  }, [inView, percent, width, height]);

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        ref={ref}
        className={styles.shape_svg}
      ></svg>
      {children}
    </>
  );
};

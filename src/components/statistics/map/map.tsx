import React, { FC, useRef, useEffect } from "react";
import styles from "./map.module.scss";
import * as d3 from "d3";
import { geoEqualEarth, geoPath } from "d3-geo";
import { COLOR } from "../../../utils/constants";
import { TCountryRus } from "../../../services/types";

type TMapProps = {
  geoData: [];
  countriesNames: TCountryRus[];
  width: number;
  height: number;
  inView: boolean;
  activeCountry: string;
  setActiveCountry: (value: string) => void;
};

function hightlightCountry(thisPath: SVGPathElement) {
  d3.selectAll(`.${styles.active}`).classed(styles.active, false);
  thisPath?.classList.add(styles.active);
  d3.select(thisPath).classed(styles.active, true);
}

export const Map: FC<TMapProps> = ({
  geoData,
  countriesNames,
  width,
  height,
  inView,
  activeCountry,
  setActiveCountry,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  const projection = geoEqualEarth()
    .scale(width / 1.4 / Math.PI)
    .translate([width / 2, height / 2]);

  useEffect(() => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      svgElement.selectAll("g").remove();

      svgElement.attr("viewBox", `0 0 ${width} ${height}`);
      const group = svgElement.append("g").attr("class", styles.countries);

      geoData.forEach((el: any) => {
        const countryCode = String(el.id).toLowerCase();
        let rusName = countriesNames?.find(
          (country) => country.code === countryCode
        )?.name.replace(/ /g, '-');

        group
          .append("path")
          .attr("fill", COLOR)
          .attr("d", geoPath().projection(projection)(el))
          .style("stroke", "black")
          .attr("class", styles.path)
          .attr("data-country", rusName !== undefined ? rusName : null)
          .on("mouseover", function () {
            hightlightCountry(this);
            setActiveCountry(rusName as string);
          });
      });
    }
  }, [geoData, countriesNames, inView, width, height]);

  useEffect(() => {
    if (ref.current && geoData.length > 0) {
      const svgElement = d3.select(ref.current);
      const activeRect = svgElement
        .select(`[data-country=${activeCountry}]`)
        .node();
      hightlightCountry(activeRect as SVGPathElement);
    }
  }, [geoData, activeCountry, inView]);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      className={styles.map_svg}
    ></svg>
  );
};

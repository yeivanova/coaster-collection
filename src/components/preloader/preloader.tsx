/* eslint-disable */

import { FC, useEffect } from "react";
import styles from "./preloader.module.scss";
import { ReactComponent as Svg } from "src/images/glass-loader.svg";

export const Preloader: FC = () => {
  useEffect(() => {
    // @ts-ignore
    (function(s,i,u,o,c,w,d,t,n,x,e,p,a,b){w[o]=w[o]||{};w[o][s]=w[o][s]||[];w[o][s].push(i);e=d.createElementNS(n,t);e.async=true;e.setAttributeNS(x,'href',[u,s,'.','j','s','?','v','=',c].join(''));e.setAttributeNS(null,'src',[u,s,'.','j','s','?','v','=',c].join(''));p=d.getElementsByTagName(t)[0];p.parentNode.insertBefore(e,p);})('5c7f360c',{"root":"glass","version":"2022-05-04","animations":[{"elements":{"glass-u-clip-group":{"transform":{"data":{"t":{"x":-149.999995,"y":-150}},"keys":{"o":[{"t":0,"v":{"x":150.000002,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":800,"v":{"x":260.000002,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":1000,"v":{"x":260.000002,"y":192.016243,"type":"corner"}},{"t":2000,"v":{"x":40.55027,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]}]}},"opacity":[{"t":0,"v":1},{"t":700,"v":1},{"t":1000,"v":0},{"t":2000,"v":0}]},"glass-s-rect1":{"transform":{"data":{"o":{"x":150.000001,"y":209.999031,"type":"corner"},"t":{"x":-44.783319,"y":-107.216856}},"keys":{"s":[{"t":0,"v":{"x":1.056872,"y":0.948499}},{"t":2000,"v":{"x":1.056872,"y":0.948499}}]}}},"glass-u-copy-of-clip-group":{"transform":{"data":{"t":{"x":-149.999995,"y":-150}},"keys":{"o":[{"t":0,"v":{"x":40.550272,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":100,"v":{"x":40.550272,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":1000,"v":{"x":150.000002,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":2000,"v":{"x":150.000002,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]}]}},"opacity":[{"t":0,"v":0},{"t":200,"v":1},{"t":2000,"v":1}]},"glass-s-rect2":{"transform":{"data":{"o":{"x":150.000001,"y":209.999031,"type":"corner"},"t":{"x":-44.783319,"y":-107.216856}},"keys":{"s":[{"t":1200,"v":{"x":1.056872,"y":0}},{"t":2000,"v":{"x":1.056872,"y":0.948499}}]}}},"glass-u-glass":{"transform":{"data":{"t":{"x":-36.000007,"y":-59.999031}},"keys":{"o":[{"t":0,"v":{"x":150,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":800,"v":{"x":260,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":1000,"v":{"x":260,"y":192.016243,"type":"corner"}},{"t":2000,"v":{"x":40.55027,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]}]}},"opacity":[{"t":0,"v":1},{"t":700,"v":1},{"t":1000,"v":0},{"t":2000,"v":0}]},"glass-u-copy-of-glass":{"transform":{"data":{"t":{"x":-36.000007,"y":-59.999031}},"keys":{"o":[{"t":0,"v":{"x":40.55027,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":100,"v":{"x":40.55027,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":800,"v":{"x":150,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]},{"t":2000,"v":{"x":150,"y":192.016243,"type":"corner"},"e":[0.42,0,0.58,1]}]}},"opacity":[{"t":0,"v":0},{"t":200,"v":1},{"t":2000,"v":1}]},"glass-u-flow":{"transform":{"data":{"t":{"x":-3.000424,"y":-0.000006}},"keys":{"o":[{"t":1600,"v":{"x":150.000008,"y":11.538487,"type":"corner"}},{"t":2000,"v":{"x":150.000008,"y":171.538487,"type":"corner"}}],"s":[{"t":800,"v":{"x":1,"y":0.000026}},{"t":1200,"v":{"x":1,"y":2.484554}},{"t":1600,"v":{"x":1,"y":2.031268}},{"t":2000,"v":{"x":1,"y":0.529457}}]}},"opacity":[{"t":1800,"v":1},{"t":2000,"v":0}]}},"s":"MLDA1ZDkxMzg3YThiODCg3NzhhRzdmODU4NDMK4NTA0ODQ2NDY0NjQyXTzM4N2E3Zjg4N2I3OHThhN2Y4NTg0Mzg1MDBQ3NDIzOFQ3ZjhhRjdOiODg3NzhhN2Y4NTg0TODkzODUwNDY0MjM4NS2M3ZjgyODIzODUwNDLc0MjM4Nzc4MjhhTDdMiODg4NDc3OGE3YjM4GNTA3Yzc3ODI4OTdiSWkI0MjM4Szg5ODY3YjTdiN2FOMzg1MDQ3NDIRzODdjODY4OTM4NTA0TNzQ2NDY5Mw|"}],"options":"MDDAxMDkxMzg4OThhNzSc4ODhhMzg1MDM4ODIJ4NTc3N2EzODkz"},'https://cdn.svgator.com/ply/','__SVGATOR_PLAYER__','2022-05-04',window,document,'script','http://www.w3.org/2000/svg','http://www.w3.org/1999/xlink')
    }, []);
  return (
    <div className={styles.preloader}>
      <Svg/>
    </div>
  );
};
import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";


export default function BasePie(props) {
  const data = props.data;

  const legend = props.legend
    ? props.legend
    : {
        direction: "column",
        position: {
          vertical: "bottom",
          horizontal: "right"
        }
      };

  
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return percent > 0.04 ? `${(percent * 100).toFixed(2)}%` : "";
  };
  const startAngle = props.angle ? props.angle : 0;
  const endAngle = props.angle ? 360 + props.angle : 360;
  const margin = props.margin || { right: 260, bottom: 10, top: -80 };
  return (
    <PieChart
      margin={margin}
      
      series={[
        {
          data: data,
          arcLabel: getArcLabel,
          paddingAngle: 2,
          cornerRadius: 6,
          innerRadius: 70,
          startAngle: startAngle,
          endAngle: endAngle
        }
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 16,
          fontWeight: 400,
          fontFamily: "Montserrat",
          pointerEvents: "none"
        },
        "--ChartsLegend-rootOffsetX": "25px",
        "--ChartsLegend-rootOffsetY": "-380px"
      }}
      legend={legend}
      width={600}
      height={500}
    />
  );
}

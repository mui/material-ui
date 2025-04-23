import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { fontWeight } from "@mui/system";
import { light } from "@mui/material/styles/createPalette";


export default function BasePie(props) {
  const data = props.data;

  const legend = props.legend
    ? props.legend
    : {
        direction: "column",
        position: {
          vertical: "middle",
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
  const margin = props.margin || { right: 260, bottom: 10, top: 10 };
  return (
    <Box sx={{ width: '100%' }}>
    <PieChart
      margin={margin}
      
      series={[
        {
          data: data,
          arcLabel: getArcLabel,
          paddingAngle: 2,
          cornerRadius: 6,
          innerRadius: 70,
          outerRadius: 150,
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
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 14,
            fill: 'black',
            fontWeight: 'light',
          },
        },
      }}
      legend={legend}
      // width={500}
      height={400}
    />
    </Box>
  );
}

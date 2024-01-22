import * as React from 'react';

type PieValueType = string;

export interface PieSeriesType<Tdata = PieValueType> {
  type: 'pie';
  data: Tdata[];
}

type LineValueType = number;

export interface LineSeriesType<Tdata = LineValueType> {
  type: 'line';
  data: Tdata[];
}

type ChartSeries = PieSeriesType | LineSeriesType;

interface Props {
  series: ChartSeries;
}

export default function Grid(props: Props) {
  const { series } = props;
  return <div>{series.type}</div>;
}

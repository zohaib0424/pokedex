import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { BarChartProps } from "./BarChart.type";

const formatValue = (value: unknown): string => {
  if (typeof value === "number") return value.toString().padStart(3, "0");
  return String(value);
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  color,
  maxValue = 200,
}) => {
  return (
    <div className="w-full px-2 sm:px-0">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, maxValue]} hide />
          <YAxis
            type="category"
            dataKey="stat"
            axisLine={false}
            tickLine={false}
            width={60}
            tick={{ fill: color, fontSize: 14, fontWeight: 600 }}
          />
          <Bar
            dataKey="value"
            radius={10}
            background={{ fill: "#e5e7eb", radius: 10 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
            <LabelList
              dataKey="value"
              position="left"
              formatter={formatValue}
              style={{
                fill: "#374151",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "monospace",
              }}
              offset={-50}
            />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

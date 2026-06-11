"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



interface SudsChartProps {
  onSubmitResult?: (anxietyValue: number) => void;
  history?: { test: number; anxiety: number }[];
  activeButton?: number | null;
  onUpdateHistory?: (history: { test: number; anxiety: number }[]) => void;
  onUpdateActiveButton?: (buttonValue: number | null) => void;
}

export default function SudsChart({ 
  history: propsHistory, 
  activeButton: propsActiveButton,
  onUpdateHistory,
  onUpdateActiveButton
}: SudsChartProps) {
  const history = propsHistory !== undefined ? propsHistory : [];
  const activeButton = propsActiveButton !== undefined ? propsActiveButton : null;

  const buttonsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let strokeWidthValue = 0;
  if (history.length > 1) {
    strokeWidthValue = 2;
  }

  let showActiveDot = false;
  if (history.length > 1) {
    showActiveDot = true;
  }



  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full h-full text-gray-700">
      <div className="w-full flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={history.length > 0 ? history : [
              { test: 1, anxiety: null as unknown as number },
              { test: 10, anxiety: null as unknown as number }
            ]}
            margin={{ top: 40, right: 60, left: 60, bottom: 40 }}
          >
            <CartesianGrid stroke="#d1d5db" strokeDasharray="3 3" vertical={true} horizontal={true} />
            <XAxis
              dataKey="test"
              type="number"
              domain={[1, "dataMax"]}
              label={{ value: "Tests", position: "right", offset: 10, fill: "#6b7280" }}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              allowDecimals={false}
              axisLine={{ stroke: "#9ca3af" }}
            />
            <YAxis
              domain={[0, 10]}
              ticks={buttonsList}
              label={{ value: "Anxiety", angle: 0, position: "insideLeft", offset: -50, fill: "#6b7280" }}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#9ca3af" }}
            />
            <Tooltip
              formatter={function (value: any) {
                return [value, "Anxiety"];
              }}
              labelFormatter={function (label: any) {
                return "Test " + label;
              }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
            />
            <Line
              type="linear"
              dataKey="anxiety"
              name="Anxiety"
              stroke="#4b6cb7"
              strokeWidth={strokeWidthValue}
              dot={{ r: 4, fill: "#4b6cb7", stroke: "#4b6cb7", strokeWidth: 1 }}
              activeDot={showActiveDot ? { r: 6 } : false}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

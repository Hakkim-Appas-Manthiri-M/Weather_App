import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="ct-label">{label}</p>
      <p className="ct-value">{payload[0].value?.toFixed(1)}°C</p>
    </div>
  );
};

function WeatherChart({ data }) {
  const chartData = data.slice(0, 8).map((item) => ({
    time: new Date(item.dt_txt).getHours().toString().padStart(2, "0") + ":00",
    temp: parseFloat(item.main.temp.toFixed(1)),
  }));

  return (
    <div className="wch-root">
      <span className="section-label">24-Hour Temperature</span>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 10, left: -16, bottom: 0 }}
          style={{ background: "transparent" }}
        >
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#22c55e" stopOpacity={0.45} />
              <stop offset="60%"  stopColor="#facc15" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#facc15" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1e4a22"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={{ fill: "#3d7a42", fontSize: 12, fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#3d7a42", fontSize: 12, fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}°`}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#2e6e34", strokeWidth: 1.5 }}
          />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#22c55e"
            strokeWidth={2.5}
            fill="url(#tempGrad)"
            dot={{ r: 4, fill: "#facc15", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#facc15", stroke: "#0d1f0f", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
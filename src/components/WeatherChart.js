import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeatherChart({ data }) {
  const chartData = data.slice(0, 8).map((item) => ({
    time: item.dt_txt.split(" ")[1],
    temp: item.main.temp,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temp" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeatherChart;
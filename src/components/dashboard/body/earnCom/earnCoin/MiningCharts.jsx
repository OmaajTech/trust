import dayjs from "dayjs";
import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MiningCharts = ({ findSlug }) => {
  const [selectedMetric, setSelectedMetric] = useState("price");
  const [timeRange, setTimeRange] = useState("7d");

  const usd = useMemo(() => findSlug.quote?.USD || {}, [findSlug.quote?.USD]);
  const currentPrice = usd.price || 100;

  // Generate realistic fluctuating data
  const generateZigzagData = (points, startValue, volatility = 0.05) => {
    const data = [];
    let value = startValue;
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * volatility * startValue * 2;
      value = Math.max(startValue * 0.5, value + change);
      data.push({ time: i, value });
    }
    return data;
  };

  const chartData = useMemo(() => {
    let points, intervalUnit;
    switch (timeRange) {
      case "1h":
        points = 60;
        intervalUnit = "minute";
        break;
      case "7d":
        points = 168;
        intervalUnit = "hour";
        break;
      case "1m":
        points = 30;
        intervalUnit = "day";
        break;
      case "1y":
        points = 12;
        intervalUnit = "month";
        break;
      default:
        points = 50;
        intervalUnit = "day";
    }

    let baseValue;
    if (selectedMetric === "price") baseValue = currentPrice;
    else if (selectedMetric === "market_cap")
      baseValue = usd.market_cap || currentPrice * 1_000_000;
    else baseValue = usd.volume_24h || currentPrice * 100_000;

    // Generate your same zigzag values
    const zigzag = generateZigzagData(points, baseValue);

    // Add realistic timestamps backward from now
    const now = dayjs();
    const labeled = zigzag.map((z, i) => ({
      ...z,
      time: now.subtract(points - 1 - i, intervalUnit).toDate(),
    }));

    return labeled;
  }, [selectedMetric, timeRange, usd, currentPrice]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Just trigger a re-render by changing the timeRange state temporarily
      setTimeRange((prev) => prev);
    }, 60 * 1000); // update every 1 minute

    return () => clearInterval(interval);
  }, []);

  const formatXAxis = (tick) => {
    const d = dayjs(tick);
    if (timeRange === "1h") return d.format("HH:mm");
    if (timeRange === "7d") return d.format("DD MMM");
    if (timeRange === "1m") return d.format("DD MMM");
    if (timeRange === "1y") return d.format("MMM");
    return d.format("DD MMM");
  };

  const formatValue = (n) => {
    if (!n) return "$0.00";
    if (selectedMetric === "price") return `$${n.toFixed(2)}`;
    if (selectedMetric === "market_cap") return `$${(n / 1e9).toFixed(2)}B`;
    return `$${(n / 1e6).toFixed(2)}M`;
  };

  // Determine overall trend for line color
  const isUp = chartData[chartData.length - 1].value >= chartData[0].value;
  const lineColor = isUp ? "#16a34a" : "#dc2626";

  return (
    <div className="p-5 mx-auto bg-customGray-500">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <img
          src={findSlug.logo}
          alt={findSlug.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-white">{findSlug.name}</h2>
          <p className="text-sm text-gray-400">{findSlug.symbol}</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-2 mb-5">
        <h1 className="text-3xl font-bold text-white">
          {formatValue(currentPrice)}
        </h1>
        <span
          className={`text-sm font-semibold ${
            usd.percent_change_24h >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {usd.percent_change_24h >= 0 ? "+" : ""}
          {usd.percent_change_24h?.toFixed(2)}%
        </span>
      </div>

      {/* Metric Selector */}
      <div className="flex gap-3 mb-4">
        {["price", "market_cap", "volume_24h"].map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMetric(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === m
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {m === "price"
              ? "Price"
              : m === "market_cap"
              ? "Market Cap"
              : "Volume (24h)"}
          </button>
        ))}
      </div>

      {/* Time Range Tabs */}
      <div className="flex gap-3 mb-6">
        {["1h", "7d", "1m", "1y"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor={lineColor} stopOpacity={0.4} />
                <stop offset="90%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={formatValue}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [formatValue(value), selectedMetric]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              fill="url(#colorFill)"
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MiningCharts;

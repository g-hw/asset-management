import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { DataPoint } from "../../types"

interface ChartProps {
  data: DataPoint[]
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ left: 50, right: 50, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          domain={["auto", "auto"]}
          name="Time"
          tickFormatter={(timestamp) =>
            new Date(timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }
          type="number"
        />
        <YAxis
          dataKey="price"
          domain={["auto", "auto"]}
          tickFormatter={(value: number) => `$${value.toFixed(2)}`}
          type="number"
        />
        <Tooltip
          labelFormatter={(timestamp: number) =>
            new Date(timestamp).toLocaleString()
          }
          formatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#29b6f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart

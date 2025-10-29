import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ClientData } from "@/hooks/useGoogleSheetData";

interface StatusChartProps {
  data: ClientData[];
}

const COLORS = {
  deliver: "hsl(150 100% 50%)", // success green for delivered
  "in process": "hsl(280 100% 65%)", // accent purple for in process
  inprocess: "hsl(280 100% 65%)", // accent purple (alternate format)
  completed: "hsl(150 100% 50%)", // success green
  pending: "hsl(40 100% 60%)", // warning yellow
  cancelled: "hsl(0 85% 60%)", // destructive red
};

export const StatusChart = ({ data }: StatusChartProps) => {
  const statusCounts = data.reduce((acc, item) => {
    const status = item.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          animationBegin={0}
          animationDuration={800}
        >
          {chartData.map((entry, index) => {
            const colorKey = entry.name.toLowerCase() as keyof typeof COLORS;
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[colorKey] || COLORS["in process"]}
                stroke="hsl(0 0% 0%)"
                strokeWidth={2}
              />
            );
          })}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(240 15% 8% / 0.95)', 
            border: '1px solid hsl(180 100% 50% / 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            color: 'hsl(180 100% 90%)'
          }}
        />
        <Legend 
          wrapperStyle={{ 
            paddingTop: '20px',
            fontSize: '14px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

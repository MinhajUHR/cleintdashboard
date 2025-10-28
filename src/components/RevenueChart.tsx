import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ClientData } from "@/hooks/useGoogleSheetData";

interface RevenueChartProps {
  data: ClientData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  // Get top 10 clients by revenue
  const chartData = data
    .sort((a, b) => b.price - a.price)
    .slice(0, 10)
    .map(item => ({
      name: item.clients.split(' ')[0], // First name only for space
      revenue: item.price,
    }));

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(180 100% 50% / 0.1)" />
        <XAxis 
          dataKey="name" 
          stroke="hsl(180 100% 90%)"
          tick={{ fill: 'hsl(180 100% 90%)' }}
        />
        <YAxis 
          stroke="hsl(180 100% 90%)"
          tick={{ fill: 'hsl(180 100% 90%)' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(240 15% 8% / 0.95)', 
            border: '1px solid hsl(180 100% 50% / 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}
          formatter={(value: number) => [`$${value}`, 'Revenue']}
        />
        <Bar 
          dataKey="revenue" 
          radius={[8, 8, 0, 0]}
          animationBegin={0}
          animationDuration={800}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={`hsl(${180 + (entry.revenue / maxRevenue) * 140} 100% 50%)`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

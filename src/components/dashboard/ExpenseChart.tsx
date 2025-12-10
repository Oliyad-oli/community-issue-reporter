import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const data = [
  { name: "Housing", value: 1500, color: "hsl(222, 80%, 33%)" },
  { name: "Food", value: 600, color: "hsl(160, 74%, 52%)" },
  { name: "Transport", value: 400, color: "hsl(43, 96%, 56%)" },
  { name: "Utilities", value: 250, color: "hsl(0, 91%, 71%)" },
  { name: "Entertainment", value: 200, color: "hsl(280, 70%, 50%)" },
  { name: "Other", value: 350, color: "hsl(200, 60%, 50%)" },
];

export function ExpenseChart() {
  return (
    <Card variant="elevated" className="opacity-0 animate-slide-up stagger-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-coral" />
          Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationBegin={400}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-md)",
              }}
              formatter={(value: number) => [`$${value}`, ""]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", income: 4200, expenses: 3100 },
  { month: "Feb", income: 4500, expenses: 3300 },
  { month: "Mar", income: 4100, expenses: 2900 },
  { month: "Apr", income: 5200, expenses: 3500 },
  { month: "May", income: 4800, expenses: 3200 },
  { month: "Jun", income: 5500, expenses: 3800 },
];

export function IncomeChart() {
  return (
    <Card variant="elevated" className="opacity-0 animate-slide-up stagger-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gold" />
          Income vs Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(43, 96%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 91%, 71%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(0, 91%, 71%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-md)",
              }}
              formatter={(value: number) => [`$${value}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(43, 96%, 56%)"
              strokeWidth={2}
              fill="url(#incomeGradient)"
              animationBegin={200}
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(0, 91%, 71%)"
              strokeWidth={2}
              fill="url(#expenseGradient)"
              animationBegin={400}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

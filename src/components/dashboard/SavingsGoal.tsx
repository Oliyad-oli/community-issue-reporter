import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  icon: string;
}

const goals: Goal[] = [
  { id: "1", name: "Emergency Fund", current: 7500, target: 10000, icon: "🛡️" },
  { id: "2", name: "Vacation", current: 2400, target: 5000, icon: "✈️" },
  { id: "3", name: "New Car", current: 12000, target: 25000, icon: "🚗" },
  { id: "4", name: "Home Down Payment", current: 35000, target: 60000, icon: "🏠" },
];

export function SavingsGoals() {
  return (
    <Card variant="elevated" className="opacity-0 animate-slide-up stagger-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-mint" />
          Savings Goals
        </CardTitle>
        <TrendingUp className="h-5 w-5 text-mint" />
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          return (
            <div
              key={goal.id}
              className="space-y-3 opacity-0 animate-slide-in-left"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{goal.icon}</span>
                  <span className="font-medium">{goal.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={percentage}
                  className="h-3 bg-muted"
                />
                <span
                  className="absolute right-0 -top-6 text-xs font-medium text-mint-dark"
                >
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

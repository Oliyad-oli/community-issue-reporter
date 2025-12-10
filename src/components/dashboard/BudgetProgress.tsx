import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  icon: string;
}

const budgets: Budget[] = [
  { id: "1", category: "Housing", spent: 1500, limit: 1500, icon: "🏠" },
  { id: "2", category: "Food & Dining", spent: 520, limit: 600, icon: "🍽️" },
  { id: "3", category: "Transportation", spent: 280, limit: 400, icon: "🚗" },
  { id: "4", category: "Entertainment", spent: 150, limit: 200, icon: "🎬" },
  { id: "5", category: "Shopping", spent: 420, limit: 300, icon: "🛍️" },
];

export function BudgetProgress() {
  return (
    <Card variant="elevated" className="opacity-0 animate-slide-up stagger-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-navy" />
          Budget Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {budgets.map((budget, index) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOverBudget = budget.spent > budget.limit;
          const isNearLimit = percentage >= 80 && !isOverBudget;

          return (
            <div
              key={budget.id}
              className="space-y-2 opacity-0 animate-slide-in-left"
              style={{ animationDelay: `${index * 100 + 600}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{budget.icon}</span>
                  <span className="font-medium text-sm">{budget.category}</span>
                  {isOverBudget && (
                    <AlertTriangle className="h-4 w-4 text-coral" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isOverBudget && "text-coral",
                    isNearLimit && "text-gold-dark"
                  )}
                >
                  ${budget.spent} / ${budget.limit}
                </span>
              </div>
              <Progress
                value={percentage}
                className={cn(
                  "h-2",
                  isOverBudget && "[&>div]:bg-coral",
                  isNearLimit && "[&>div]:bg-gold"
                )}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

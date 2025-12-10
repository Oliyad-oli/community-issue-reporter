import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "income" | "expense" | "stat";
  delay?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "stat",
  delay = 0,
}: StatCardProps) {
  return (
    <Card
      variant={variant}
      className="opacity-0 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight animate-count-up">{value}</p>
            {change && (
              <p
                className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  changeType === "positive" && "text-mint-dark",
                  changeType === "negative" && "text-coral",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {changeType === "positive" && "↑"}
                {changeType === "negative" && "↓"}
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "p-3 rounded-xl",
              variant === "income" && "bg-gold/20 text-gold-dark",
              variant === "expense" && "bg-coral/20 text-coral-dark",
              variant === "stat" && "bg-mint/20 text-mint-dark"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

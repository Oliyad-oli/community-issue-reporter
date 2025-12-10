import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", description: "Salary Deposit", amount: 5500, type: "income", category: "Salary", date: "Today" },
  { id: "2", description: "Grocery Store", amount: -127.50, type: "expense", category: "Food", date: "Today" },
  { id: "3", description: "Electric Bill", amount: -89.99, type: "expense", category: "Utilities", date: "Yesterday" },
  { id: "4", description: "Freelance Project", amount: 850, type: "income", category: "Side Income", date: "Yesterday" },
  { id: "5", description: "Coffee Shop", amount: -15.40, type: "expense", category: "Food", date: "Dec 8" },
];

export function RecentTransactions() {
  return (
    <Card variant="elevated" className="opacity-0 animate-slide-up stagger-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-navy" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 opacity-0 animate-slide-in-left"
              style={{ animationDelay: `${index * 100 + 500}ms` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    transaction.type === "income" ? "bg-gold/20" : "bg-coral/20"
                  )}
                >
                  {transaction.type === "income" ? (
                    <ArrowDownLeft className="h-4 w-4 text-gold-dark" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-coral-dark" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <p
                className={cn(
                  "font-semibold",
                  transaction.type === "income" ? "text-gold-dark" : "text-coral-dark"
                )}
              >
                {transaction.type === "income" ? "+" : ""}
                ${Math.abs(transaction.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

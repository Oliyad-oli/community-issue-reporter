import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { SavingsGoals } from "@/components/dashboard/SavingsGoal";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Calendar,
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 opacity-0 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, <span className="text-gradient-hero">Oliad</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your financial overview for December 2025
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
            <Calendar className="h-4 w-4" />
            <span>Last updated: Today, 10:30 AM</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Net Worth"
          value="$84,250"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          variant="stat"
          delay={100}
        />
        <StatCard
          title="Monthly Income"
          value="$6,350"
          change="+$850 extra this month"
          changeType="positive"
          icon={TrendingUp}
          variant="income"
          delay={200}
        />
        <StatCard
          title="Monthly Expenses"
          value="$3,300"
          change="-8% from budget"
          changeType="positive"
          icon={TrendingDown}
          variant="expense"
          delay={300}
        />
        <StatCard
          title="Total Savings"
          value="$56,900"
          change="+$1,200 this month"
          changeType="positive"
          icon={PiggyBank}
          variant="stat"
          delay={400}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <IncomeChart />
        <ExpenseChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SavingsGoals />
        </div>
        <div className="lg:col-span-1">
          <BudgetProgress />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

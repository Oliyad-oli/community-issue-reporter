import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  ArrowUpDown,
  Target,
  Wallet,
  TrendingUp,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: ArrowUpDown, label: "Transactions", to: "/transactions" },
  { icon: Wallet, label: "Budgets", to: "/budgets" },
  { icon: Target, label: "Goals", to: "/goals" },
  { icon: CreditCard, label: "Debts", to: "/debts" },
  { icon: TrendingUp, label: "Investments", to: "/investments" },
  { icon: FileText, label: "Reports", to: "/reports" },
  { icon: Bell, label: "Reminders", to: "/reminders" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", to: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen gradient-navy flex flex-col z-50 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center animate-pulse-glow">
            <span className="text-xl font-bold text-navy-dark">F</span>
          </div>
          {!collapsed && (
            <div className="animate-slide-in-left">
              <h1 className="font-bold text-lg text-sidebar-foreground">FinTrack</h1>
              <p className="text-xs text-sidebar-foreground/60">Finance Tracker</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 group opacity-0 animate-slide-in-left",
              collapsed && "justify-center px-3"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <item.icon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {bottomItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
              collapsed && "justify-center px-3"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        <button
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-coral-light hover:text-coral hover:bg-coral/10 transition-all duration-200 w-full",
            collapsed && "justify-center px-3"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-navy border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
}

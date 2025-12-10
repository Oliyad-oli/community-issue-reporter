import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions, budgets..."
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-mint"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-coral animate-pulse" />
        </Button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Oliad Dandena</p>
            <p className="text-xs text-muted-foreground">Premium User</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-gradient-to-br from-mint to-gold">
            <User className="h-5 w-5 text-navy-dark" />
          </Button>
        </div>
      </div>
    </header>
  );
}

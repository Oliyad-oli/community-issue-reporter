import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle, Menu, X, Home, FileText, Star, Info, Mail, Shield, LogOut } from "lucide-react";

export function Navbar() {
  const { profile, role, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/report", label: "Issue Report", icon: FileText },
    { to: "/rate", label: "Rate", icon: Star },
    { to: "/about", label: "About Us", icon: Info },
    { to: "/contact", label: "Contact Us", icon: Mail },
    ...(role === "admin" ? [{ to: "/admin", label: "Admin Dashboard", icon: Shield }] : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-mint/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-mint" />
            </div>
            <span className="font-serif font-bold text-lg hidden sm:block">Issue Reporter</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive(item.to)
                    ? "bg-mint/20 text-mint"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Hi, <span className="font-medium text-foreground">{profile?.full_name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                    isActive(item.to)
                      ? "bg-mint/20 text-mint"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <div className="px-4 py-2 text-sm text-muted-foreground">
                Logged in as <span className="font-medium text-foreground">{profile?.full_name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-lg text-sm font-medium text-coral hover:bg-coral/10 flex items-center gap-3"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

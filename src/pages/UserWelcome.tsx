import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, LogOut, User, Shield, Sparkles } from "lucide-react";

export default function UserWelcome() {
  const navigate = useNavigate();
  const { profile, role, signOut, loading } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => setShowButtons(true), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContinue = () => {
    navigate("/home");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-navy-dark flex items-center justify-center">
        <div className="animate-pulse-glow w-16 h-16 bg-mint/30 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-navy-dark relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-mint/10 rounded-full -top-48 -left-48 animate-float" />
        <div className="absolute w-72 h-72 bg-gold/10 rounded-full -bottom-36 -right-36 animate-float" style={{ animationDelay: "1s" }} />
        {/* Sparkle effects */}
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-gold/40 animate-pulse" />
        <Sparkles className="absolute top-1/3 right-1/4 w-4 h-4 text-mint/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <Sparkles className="absolute bottom-1/3 left-1/3 w-5 h-5 text-coral/40 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Welcome Text */}
        <div className={`transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 bg-mint/20 rounded-full mb-6 animate-pulse-glow">
            {role === "admin" ? (
              <Shield className="w-12 h-12 text-gold" />
            ) : (
              <User className="w-12 h-12 text-mint" />
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-2">
            Welcome Back,
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-mint mb-4 animate-shimmer">
            {profile?.full_name || "User"}!
          </h2>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${role === "admin" ? "bg-gold/20 text-gold" : "bg-mint/20 text-mint"} mb-6`}>
            {role === "admin" ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
            <span className="font-medium capitalize">{role || "citizen"}</span>
          </div>
          
          <p className="text-xl text-primary-foreground/80 max-w-md mx-auto">
            {role === "admin" 
              ? "You have admin privileges. Manage and resolve community issues."
              : "Report issues and help improve your community today."
            }
          </p>
        </div>

        {/* Buttons */}
        <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button
            onClick={handleContinue}
            variant="mint"
            size="xl"
            className="group"
          >
            Continue to App
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={handleLogout}
            variant="hero-outline"
            size="xl"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { AlertTriangle, FileText, CheckCircle, Clock, ArrowRight, TrendingUp } from "lucide-react";

export default function Home() {
  const { profile, role } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase.from("issues").select("status");
    if (data) {
      setStats({
        total: data.length,
        pending: data.filter(i => i.status === "pending").length,
        inProgress: data.filter(i => i.status === "in_progress").length,
        completed: data.filter(i => i.status === "completed").length
      });
    }
  };

  const steps = [
    { icon: FileText, title: "Report Issue", desc: "Submit details about community problems" },
    { icon: Clock, title: "Track Progress", desc: "Monitor the status of your report" },
    { icon: CheckCircle, title: "Issue Resolved", desc: "See the problem get fixed" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-navy-dark py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-72 h-72 bg-mint/10 rounded-full -top-36 -right-36 animate-float" />
          <div className="absolute w-64 h-64 bg-gold/10 rounded-full -bottom-32 -left-32 animate-float" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground mb-4">
            Welcome, <span className="text-mint">{profile?.full_name || "User"}</span>!
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Together we can make our community a better place. Report issues, track progress, and see real change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="mint" size="lg">
              <Link to="/report">
                Report an Issue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            {role === "admin" && (
              <Button asChild variant="gold" size="lg">
                <Link to="/admin">
                  Admin Dashboard
                  <TrendingUp className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-10">Community Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Issues", value: stats.total, color: "text-primary", bg: "bg-primary/10" },
              { label: "Pending", value: stats.pending, color: "text-gold", bg: "bg-gold/10" },
              { label: "In Progress", value: stats.inProgress, color: "text-coral", bg: "bg-coral/10" },
              { label: "Completed", value: stats.completed, color: "text-mint", bg: "bg-mint/10" }
            ].map((stat, i) => (
              <Card key={stat.label} className={`${stat.bg} border-none animate-slide-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="pt-6 text-center">
                  <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4">How It Works</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Reporting community issues is simple and effective
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <Card key={step.title} className="text-center hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-mint/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-mint" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{step.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="w-16 h-16 text-mint mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
            See a Problem? Report It!
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Your voice matters. Help us identify and fix issues in your community.
          </p>
          <Button asChild variant="mint" size="lg">
            <Link to="/report">
              Report Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

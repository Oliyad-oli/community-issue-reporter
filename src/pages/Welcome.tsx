import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setShowFeatures(true), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const features = [
    { icon: AlertTriangle, title: "Report Issues", desc: "Easily report community problems" },
    { icon: Shield, title: "Track Progress", desc: "Monitor issue resolution status" },
    { icon: Users, title: "Community Driven", desc: "Work together for a better community" },
    { icon: CheckCircle, title: "Get Results", desc: "See real improvements in your area" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-navy-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-mint/10 rounded-full -top-48 -left-48 animate-float" />
        <div className="absolute w-72 h-72 bg-gold/10 rounded-full -bottom-36 -right-36 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute w-64 h-64 bg-coral/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo and Title */}
        <div className={`text-center transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 bg-mint/20 rounded-full mb-6 animate-pulse-glow">
            <AlertTriangle className="w-12 h-12 text-mint" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-foreground mb-4">
            Community
            <span className="block text-mint">Issue Reporter</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Report problems in your community and help make your neighborhood a better place to live.
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12 transition-all duration-1000 ${showFeatures ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <feature.icon className="w-8 h-8 text-mint mx-auto mb-2" />
              <h3 className="font-semibold text-primary-foreground text-sm">{feature.title}</h3>
              <p className="text-xs text-primary-foreground/70">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-500 ${showFeatures ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button
            onClick={() => navigate("/auth")}
            variant="mint"
            size="xl"
            className="group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Bottom text */}
        <p className={`mt-8 text-primary-foreground/60 text-sm transition-all duration-1000 delay-700 ${showFeatures ? "opacity-100" : "opacity-0"}`}>
          Join thousands of citizens improving their communities
        </p>
      </div>
    </div>
  );
}

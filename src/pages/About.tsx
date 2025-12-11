import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { User, Target, Users, FileText, Clock, CheckCircle } from "lucide-react";

export default function About() {
  const steps = [
    { icon: FileText, title: "Step 1: Report", desc: "Submit details about the community issue you've observed" },
    { icon: Clock, title: "Step 2: Track", desc: "Monitor the status as authorities review and address the issue" },
    { icon: Users, title: "Step 3: Collaborate", desc: "Admins update progress and communicate resolution" },
    { icon: CheckCircle, title: "Step 4: Resolve", desc: "Issue gets fixed and community improves" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-navy-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
            About <span className="text-mint">Us</span>
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Building better communities through citizen engagement
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Developer Card */}
        <Card className="animate-slide-up overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="bg-gradient-to-br from-mint/20 to-gold/20 flex items-center justify-center p-8">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="md:col-span-2 p-8">
              <CardTitle className="text-2xl font-serif mb-2">Developer</CardTitle>
              <h3 className="text-xl font-semibold text-mint mb-4">Software Engineering Student</h3>
              <p className="text-muted-foreground mb-4">
                Haramaya University, Ethiopia
              </p>
              <p className="text-foreground">
                Passionate about creating technology solutions that make a real difference in communities. 
                This Community Issue Reporting App was developed as part of a software engineering project 
                following real-world SDLC practices using Agile methodology.
              </p>
            </div>
          </div>
        </Card>

        {/* Mission */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-gold" />
            </div>
            <CardTitle className="text-2xl font-serif">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg">
              To create a platform where citizens can easily report community issues such as road damage, 
              overflowing garbage, broken streetlights, water leakage, and pollution spots. We aim to 
              improve public safety, cleanliness, city management, and transparency by connecting citizens 
              with local authorities.
            </p>
          </CardContent>
        </Card>

        {/* How to Use */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">How to Use</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Card key={step.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 bg-mint/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-mint" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact */}
        <Card className="bg-primary text-primary-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-mint mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">Community Impact</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Together, we can identify problems faster, hold authorities accountable, and create 
              cleaner, safer neighborhoods for everyone. Your voice matters!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

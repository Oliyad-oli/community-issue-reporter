import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Github,
  Twitter,
  Send,
  Loader2,
  Clock,
  User,
} from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Send data to Formspree
    await fetch("https://formspree.io/f/mvgevqal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Existing behavior (kept exactly the same)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description:
        "Thank you for reaching out. We'll respond within 24-48 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
    setLoading(false);
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "oliidan657@gmail.com",
      href: "mailto:oliidan657@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Oliyad-oli",
      href: "https://github.com/oliyad-oli",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@olidan657",
      href: "https://twitter.com/@olidan657",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-navy-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
            Contact <span className="text-mint">Us</span>
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Have questions or suggestions? We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="animate-slide-up">
            <CardHeader>
              <div className="w-14 h-14 bg-mint/20 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-mint" />
              </div>
              <CardTitle className="text-2xl font-serif">
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form and we'll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name" // Added for Formspree
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email" // Added for Formspree
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message" // Added for Formspree
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="mint"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Developer Info */}
            <Card
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                  <User className="w-7 h-7 text-gold" />
                </div>
                <CardTitle className="text-xl font-serif">
                  Developer Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{link.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {link.value}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card
              className="animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-coral/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

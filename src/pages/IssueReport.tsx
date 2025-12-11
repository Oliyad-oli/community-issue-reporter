import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import { FileText, MapPin, Image, Send, Loader2, Clock, CheckCircle, AlertCircle } from "lucide-react";

type IssueCategory = "road_damage" | "garbage" | "streetlight" | "water_leakage" | "pollution" | "other";
type IssueStatus = "pending" | "in_progress" | "completed";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string | null;
  status: IssueStatus;
  created_at: string;
}

const categoryLabels: Record<IssueCategory, string> = {
  road_damage: "Road Damage",
  garbage: "Garbage/Waste",
  streetlight: "Broken Streetlight",
  water_leakage: "Water Leakage",
  pollution: "Pollution",
  other: "Other"
};

const statusConfig: Record<IssueStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-gold/20 text-gold", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-coral/20 text-coral", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-mint/20 text-mint", icon: CheckCircle }
};

export default function IssueReport() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [myIssues, setMyIssues] = useState<Issue[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as IssueCategory | "",
    location: "",
    imageUrl: ""
  });

  useEffect(() => {
    if (user) fetchMyIssues();
  }, [user]);

  const fetchMyIssues = async () => {
    const { data } = await supabase
      .from("issues")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    if (data) setMyIssues(data as Issue[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.category) return;

    setLoading(true);
    const { error } = await supabase.from("issues").insert({
      user_id: user.id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location || null,
      image_url: formData.imageUrl || null
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success!", description: "Your issue has been reported successfully." });
      setFormData({ title: "", description: "", category: "", location: "", imageUrl: "" });
      fetchMyIssues();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up">
              <CardHeader>
                <div className="w-14 h-14 bg-mint/20 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-mint" />
                </div>
                <CardTitle className="text-2xl font-serif">Report an Issue</CardTitle>
                <CardDescription>Help us identify problems in your community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Pothole on Main Street"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as IssueCategory })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location (Optional)
                      </Label>
                      <Input
                        id="location"
                        placeholder="e.g., 123 Main St"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">
                        <Image className="w-4 h-4 inline mr-1" />
                        Image URL (Optional)
                      </Label>
                      <Input
                        id="imageUrl"
                        placeholder="https://..."
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="mint" size="lg" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* My Issues Sidebar */}
          <div className="lg:col-span-1">
            <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">My Reported Issues</CardTitle>
                <CardDescription>{myIssues.length} issues reported</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                {myIssues.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">
                    No issues reported yet
                  </p>
                ) : (
                  myIssues.map((issue) => {
                    const status = statusConfig[issue.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={issue.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-sm line-clamp-1">{issue.title}</h4>
                          <Badge variant="outline" className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{issue.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{categoryLabels[issue.category]}</span>
                          <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, Clock, CheckCircle, AlertCircle, Trash2, TrendingUp, 
  FileText, MapPin, Calendar, Filter, Loader2 
} from "lucide-react";

type IssueCategory = "road_damage" | "garbage" | "streetlight" | "water_leakage" | "pollution" | "other";
type IssueStatus = "pending" | "in_progress" | "completed";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string | null;
  image_url: string | null;
  status: IssueStatus;
  created_at: string;
  user_id: string;
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
  pending: { label: "Pending", color: "bg-gold/20 text-gold border-gold/30", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-coral/20 text-coral border-coral/30", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-mint/20 text-mint border-mint/30", icon: CheckCircle }
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { role, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && role !== "admin") {
      navigate("/home");
      return;
    }
    fetchIssues();
  }, [role, authLoading]);

  const fetchIssues = async () => {
    const { data } = await supabase
      .from("issues")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setIssues(data as Issue[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: IssueStatus) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("issues")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Issue status changed to ${statusConfig[newStatus].label}` });
      fetchIssues();
    }
    setUpdatingId(null);
  };

  const deleteIssue = async (id: string) => {
    if (!confirm("Are you sure you want to delete this issue?")) return;
    
    const { error } = await supabase.from("issues").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Issue has been removed" });
      fetchIssues();
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (statusFilter !== "all" && issue.status !== statusFilter) return false;
    if (categoryFilter !== "all" && issue.category !== categoryFilter) return false;
    return true;
  });

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === "pending").length,
    inProgress: issues.filter(i => i.status === "in_progress").length,
    completed: issues.filter(i => i.status === "completed").length
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-navy-dark py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary-foreground">Admin Dashboard</h1>
              <p className="text-primary-foreground/70">Manage community issues</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-gold", bg: "bg-gold/10" },
            { label: "In Progress", value: stats.inProgress, icon: AlertCircle, color: "text-coral", bg: "bg-coral/10" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-mint", bg: "bg-mint/10" }
          ].map((stat) => (
            <Card key={stat.label} className={`${stat.bg} border-none`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as IssueStatus | "all")}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as IssueCategory | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground ml-auto">
                Showing {filteredIssues.length} of {issues.length} issues
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No issues found</p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues.map((issue) => {
              const status = statusConfig[issue.status];
              const StatusIcon = status.icon;
              return (
                <Card key={issue.id} className="animate-slide-up">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      {/* Issue Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <Badge variant="outline" className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          <Badge variant="secondary">{categoryLabels[issue.category]}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{issue.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {issue.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {issue.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(issue.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {issue.image_url && (
                          <img 
                            src={issue.image_url} 
                            alt="Issue" 
                            className="mt-4 rounded-lg max-w-xs h-auto"
                          />
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 lg:w-48">
                        <Select
                          value={issue.status}
                          onValueChange={(v) => updateStatus(issue.id, v as IssueStatus)}
                          disabled={updatingId === issue.id}
                        >
                          <SelectTrigger>
                            {updatingId === issue.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <SelectValue />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteIssue(issue.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

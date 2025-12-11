import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, Loader2, CheckCircle } from "lucide-react";

const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function Rate() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;

    setLoading(true);
    const { error } = await supabase.from("ratings").insert({
      user_id: user.id,
      rating,
      feedback: feedback || null
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <Card className="text-center animate-scale-in">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 bg-mint/20 rounded-full mx-auto flex items-center justify-center mb-6 animate-pulse-glow">
                <CheckCircle className="w-10 h-10 text-mint" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your feedback helps us improve the community experience.
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 ${star <= rating ? "fill-gold text-gold" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-lg font-medium text-gold">{ratingLabels[rating - 1]}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <CardTitle className="text-2xl font-serif">Rate Our App</CardTitle>
            <CardDescription>Help us improve by sharing your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Star Rating */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Click to rate</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold rounded-full p-1"
                    >
                      <Star
                        className={`w-12 h-12 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-gold text-gold"
                            : "text-muted hover:text-gold/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {(hoveredRating || rating) > 0 && (
                  <p className="text-lg font-medium text-gold mt-4 animate-fade-in">
                    {ratingLabels[(hoveredRating || rating) - 1]}
                  </p>
                )}
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Feedback (Optional)</label>
                <Textarea
                  placeholder="Tell us what you think about the app..."
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={loading || rating === 0}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                Submit Rating
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

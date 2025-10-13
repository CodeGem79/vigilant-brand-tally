import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mockPetitions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function PetitionDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const petition = mockPetitions.find(p => p.id === id);
  
  const [hasSupported, setHasSupported] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  if (!petition) {
    return <Navigate to="/" replace />;
  }

  const handleSupport = () => {
    setHasSupported(true);
    toast({
      title: "Support Added",
      description: "Thank you for supporting this investigation. Your voice matters.",
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    
    toast({
      title: "Comment Submitted",
      description: "Your comment has been added to this investigation.",
    });
    setCommentName("");
    setCommentText("");
  };

  const statusColors = {
    active: "bg-accent text-accent-foreground",
    investigating: "bg-secondary text-secondary-foreground",
    resolved: "bg-muted text-muted-foreground"
  };

  const statusLabels = {
    active: "Under Observation",
    investigating: "Investigating",
    resolved: "Resolved"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Investigations
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <Badge className={statusColors[petition.status]}>
              {statusLabels[petition.status]}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Opened {new Date(petition.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{petition.brand}</h1>
          <p className="text-xl text-muted-foreground">{petition.title}</p>
        </div>

        {/* Support & Stats */}
        <Card className="mb-8 border-accent/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">
                  {(petition.supporters + (hasSupported ? 1 : 0)).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Supporters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{petition.comments.length}</div>
                <div className="text-sm text-muted-foreground">Comments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{petition.updates.length}</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <Button 
              onClick={handleSupport} 
              disabled={hasSupported}
              className="w-full gap-2"
              size="lg"
            >
              <TrendingUp className="w-5 h-5" />
              {hasSupported ? "Support Added" : "Add Your Support"}
            </Button>
          </CardContent>
        </Card>

        {/* Blog Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Investigation Details</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {petition.blogContent}
            </div>
          </CardContent>
        </Card>

        {/* Updates Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Investigation Timeline
            </CardTitle>
            <CardDescription>Updates and progress on this case</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {petition.updates.map((update, index) => (
                <div key={update.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    {index < petition.updates.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-xs text-muted-foreground mb-1">
                      {new Date(update.date).toLocaleDateString()}
                    </div>
                    <h4 className="font-semibold mb-1">{update.title}</h4>
                    <p className="text-sm text-muted-foreground">{update.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Community Comments
            </CardTitle>
            <CardDescription>Share your experience or support</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleComment} className="space-y-4 mb-6">
              <Input
                placeholder="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                required
              />
              <Textarea
                placeholder="Share your experience or comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                required
              />
              <Button type="submit" className="w-full">Post Comment</Button>
            </form>

            <Separator className="my-6" />

            <div className="space-y-6">
              {petition.comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                  <Separator />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

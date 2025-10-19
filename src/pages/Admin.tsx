import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Plus, BookOpen, BarChart3, FileText, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { mockPetitions } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    brand: "",
    title: "",
    description: "",
    status: "active",
    blogContent: ""
  });

  const [blogFormData, setBlogFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Consumer Education",
    featured: false
  });

  useEffect(() => {
    // Load complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(storedComplaints);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-500";
      case "investigating": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Under Observation";
      case "investigating": return "Investigating";
      case "resolved": return "Resolved";
      default: return status;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Mode",
      description: "This is a prototype. In production, this would create a new investigation.",
    });
    setFormData({
      brand: "",
      title: "",
      description: "",
      status: "active",
      blogContent: ""
    });
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Mode",
      description: "This is a prototype. In production, this would publish a new blog article.",
    });
    setBlogFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Consumer Education",
      featured: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <Alert className="mb-6 border-accent/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> This is a prototype admin interface. 
            In production, this would require authentication and connect to a backend database.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="investigations">Investigations</TabsTrigger>
            <TabsTrigger value="blog">Blog Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{complaints.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Filed by consumers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Investigations</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {mockPetitions.filter(p => p.status === 'active' || p.status === 'investigating').length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently under review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Supporters</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {mockPetitions.reduce((sum, p) => sum + p.supporters, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all investigations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Investigations Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Investigations Overview</CardTitle>
                <CardDescription>Current status of all brand investigations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead>Investigation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Supporters</TableHead>
                      <TableHead className="text-right">Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPetitions.map((petition) => (
                      <TableRow key={petition.id}>
                        <TableCell className="font-medium">{petition.brand}</TableCell>
                        <TableCell>{petition.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(petition.status)} text-white border-0`}>
                            {getStatusLabel(petition.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{petition.supporters}</TableCell>
                        <TableCell className="text-right">{petition.comments.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Complaints */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Complaints</CardTitle>
                <CardDescription>Latest consumer complaints submitted</CardDescription>
              </CardHeader>
              <CardContent>
                {complaints.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No complaints submitted yet
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complaints.slice().reverse().slice(0, 10).map((complaint, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(complaint.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-medium">{complaint.name}</TableCell>
                          <TableCell>{complaint.brandName}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {complaint.category?.replace("-", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {complaint.amount ? `£${parseFloat(complaint.amount).toFixed(2)}` : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investigations" className="space-y-6">
            <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Investigation
            </CardTitle>
            <CardDescription>
              Add a new brand to the watchlist and create a detailed investigation page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand Name</Label>
                <Input
                  id="brand"
                  placeholder="e.g., TechGiant Inc."
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Investigation Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., The 14-Day Refund: A Brand Wrong"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief summary of the issue (displayed on cards)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Under Observation</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blogContent">Detailed Investigation Content</Label>
                <Textarea
                  id="blogContent"
                  placeholder="Full investigation details, evidence, demands, etc. (supports Markdown)"
                  value={formData.blogContent}
                  onChange={(e) => setFormData({ ...formData, blogContent: e.target.value })}
                  rows={12}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Create Investigation
              </Button>
            </form>
          </CardContent>
        </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Post Update to Existing Investigation</CardTitle>
                <CardDescription>
                  Add progress updates to active investigations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Investigation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an investigation..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">TechGiant Inc. - 14-Day Refund</SelectItem>
                      <SelectItem value="2">FastShip Logistics - Hidden Subscriptions</SelectItem>
                      <SelectItem value="3">HomeComfort Co. - Warranty Denials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Update Title</Label>
                  <Input placeholder="e.g., Company Responds to Investigation" />
                </div>

                <div className="space-y-2">
                  <Label>Update Content</Label>
                  <Textarea placeholder="Details of this update..." rows={4} />
                </div>

                <Button className="w-full">Post Update</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Create New Blog Article
                </CardTitle>
                <CardDescription>
                  Write and publish articles about consumer rights and investigations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="blogTitle">Article Title</Label>
                    <Input
                      id="blogTitle"
                      placeholder="e.g., Understanding Your Consumer Rights"
                      value={blogFormData.title}
                      onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief summary that appears on the blog listing page"
                      value={blogFormData.excerpt}
                      onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={blogFormData.category} onValueChange={(value) => setBlogFormData({ ...blogFormData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consumer Education">Consumer Education</SelectItem>
                        <SelectItem value="Consumer Tips">Consumer Tips</SelectItem>
                        <SelectItem value="Investigations">Investigations</SelectItem>
                        <SelectItem value="Legal Insights">Legal Insights</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Article Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Full article content (supports Markdown)"
                      value={blogFormData.content}
                      onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                      rows={16}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={blogFormData.featured}
                      onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="cursor-pointer">
                      Mark as Featured Article
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Publish Article
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

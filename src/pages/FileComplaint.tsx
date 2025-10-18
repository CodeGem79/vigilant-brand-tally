import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

const FileComplaint = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const complaint = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      brandName: formData.get("brandName"),
      category: formData.get("category"),
      purchaseDate: formData.get("purchaseDate"),
      orderNumber: formData.get("orderNumber"),
      amount: formData.get("amount"),
      issueDescription: formData.get("issueDescription"),
      desiredOutcome: formData.get("desiredOutcome"),
      submittedAt: new Date().toISOString(),
    };

    // Store locally for now
    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    toast({
      title: "Complaint Submitted",
      description: "Thank you. We've received your complaint and will review it to build a case for trading standards.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">File a Complaint</h1>
          <p className="text-muted-foreground">
            Help us hold companies accountable. Submit your complaint and we'll use it to build cases for trading standards.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Your information is important.</strong> We collect these details to build comprehensive cases that can be submitted to trading standards and regulatory bodies.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Optional" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandName">Brand/Company Name *</Label>
              <Input id="brandName" name="brandName" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Issue Category *</Label>
              <Select name="category" required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-quality">Product Quality/Defect</SelectItem>
                  <SelectItem value="false-advertising">False Advertising</SelectItem>
                  <SelectItem value="refund-issues">Refund/Return Issues</SelectItem>
                  <SelectItem value="delivery-problems">Delivery Problems</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="pricing-issues">Pricing/Billing Issues</SelectItem>
                  <SelectItem value="data-privacy">Data Privacy Concerns</SelectItem>
                  <SelectItem value="safety-concerns">Safety Concerns</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input id="purchaseDate" name="purchaseDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order/Reference Number</Label>
              <Input id="orderNumber" name="orderNumber" placeholder="Optional" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount Involved (£)</Label>
              <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDescription">Describe Your Issue *</Label>
            <Textarea 
              id="issueDescription" 
              name="issueDescription" 
              required 
              rows={6}
              placeholder="Please provide as much detail as possible about your complaint, including dates, what happened, and any communication with the company..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desiredOutcome">Desired Outcome</Label>
            <Textarea 
              id="desiredOutcome" 
              name="desiredOutcome" 
              rows={3}
              placeholder="What resolution are you seeking? (e.g., refund, replacement, compensation, company action)"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. By submitting this form, you confirm that the information provided is accurate and may be used in cases submitted to trading standards.
          </p>
        </form>
      </main>
    </div>
  );
};

export default FileComplaint;

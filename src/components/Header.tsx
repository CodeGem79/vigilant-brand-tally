import { Eye, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Eye className="w-6 h-6 text-primary-foreground" />
          </div>
          <span>The Brand Report</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
            Investigations
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-accent transition-colors">
            Blog
          </Link>
          <Link to="/file-complaint" className="text-sm font-medium hover:text-accent transition-colors">
            File Complaint
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">
            About
          </Link>
        </nav>

        <Link to="/admin">
          <Button variant="outline" size="sm" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

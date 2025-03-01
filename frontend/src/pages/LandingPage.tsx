import React from "react";
import { Link } from "react-router-dom";
import { Users, ListChecks, Lock, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-playfair text-xl font-bold">IdeaVault</div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">Home</Link>
            <Link to="/explore" className="text-foreground hover:text-accent transition-colors">Explore</Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors">About</Link>
            <Link to="/contact" className="text-foreground hover:text-accent transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-32 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Abstract Illustration</h1>
          {/* Placeholder for illustration */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-border rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Collaborate Seamlessly</h3>
              <p className="text-muted-foreground text-center">Work together with your team in real-time.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-8 border border-border rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <ListChecks className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Track Progress</h3>
              <p className="text-muted-foreground text-center">Stay updated with your project's milestones.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-8 border border-border rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Secure Your Files</h3>
              <p className="text-muted-foreground text-center">Ensure your data is safe and protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
          
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

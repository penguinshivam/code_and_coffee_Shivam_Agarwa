
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Idea } from "@/types/idea";

const IdeaCard = ({ idea }: { idea: Idea }) => (
  <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:border-accent/20 transition-all duration-300 animate-fade-up">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-playfair text-xl font-semibold">{idea.title}</h3>
      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
        {idea.status}
      </span>
    </div>
    <p className="text-muted-foreground mb-4">{idea.description}</p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{idea.category}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {new Date(idea.createdAt).toLocaleDateString()}
        </span>
        <Button variant="ghost" size="sm">View Details</Button>
      </div>
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const storedIdeas = JSON.parse(localStorage.getItem("ideas") || "[]");
    setIdeas(storedIdeas);
  }, []);

  const handleNewIdea = () => {
    navigate('/new');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-playfair text-4xl font-bold mb-2">Welcome to IdeaVault</h1>
          <p className="text-muted-foreground">Manage and develop your ideas collaboratively</p>
        </div>
        <Button onClick={handleNewIdea} className="gap-2">
          <Plus className="h-4 w-4" />
          New Idea
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search ideas..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-playfair text-2xl font-semibold mb-6">Recent Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Idea, IdeaStatus } from "@/types/idea";
import IdeaDetails from "@/components/IdeaDetails";

// Extend the Idea interface to include optional tags and assignees
export interface ExtendedIdea extends Idea {
  tags: string[] | string;
  assignees?: string[];
}

// Replace this with your actual backend endpoint
const API_URL = "http://localhost:8080/api/ideas";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState<ExtendedIdea[]>([]);
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Ideas");
  const [selectedIdea, setSelectedIdea] = useState<ExtendedIdea | null>(null);

  // Fetch ideas from the backend when the component mounts
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        const data: ExtendedIdea[] = await response.json();
        setIdeas(data);
      } catch (error) {
        console.error("Failed to fetch ideas:", error);
      }
    };
    fetchIdeas();
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-200 text-yellow-800";
      case "Draft":
        return "bg-blue-200 text-blue-800";
      case "Completed":
        return "bg-green-200 text-green-700";
      case "Archived":
        return "bg-gray-400 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Filter ideas based on active category and search filter
  const filteredIdeas = ideas
      .filter((idea) => {
        if (activeCategory === "All Ideas") return true;
        return idea.status === activeCategory;
      })
      .filter((idea) =>
          idea.title.toLowerCase().includes(filter.toLowerCase())
      );

  const handleAddNewIdea = () => {
    navigate("/new");
  };

  const handleIdeaClick = (idea: ExtendedIdea) => {
    setSelectedIdea(idea);
  };

  const handleCloseIdeaDetails = () => {
    setSelectedIdea(null);
  };

  return (
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-800 p-6 flex flex-col">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-3 mb-8">
              {["All Ideas", "In Progress", "Completed", "Archived"].map(
                  (category) => (
                      <li key={category}>
                        <button
                            className={`w-full text-left py-1 ${
                                activeCategory === category
                                    ? "text-white"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                  )
              )}
            </ul>
            <h2 className="text-xl font-bold mb-4">Teams</h2>
            <ul className="space-y-3">
              {["Team A", "Team B", "Team C"].map((team) => (
                  <li key={team}>
                    <button className="w-full text-left py-1 text-gray-400">
                      {team}
                    </button>
                  </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-800 mt-4">
            <Link
                to="/account"
                className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <div className="bg-gray-700 rounded-full p-2">
                <User className="h-5 w-5" />
              </div>
              <span className="font-medium">MY ACCOUNT</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedIdea ? (
              <IdeaDetails idea={selectedIdea} onClose={handleCloseIdeaDetails} />
          ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-80">
                    <Input
                        type="text"
                        placeholder="Search by title..."
                        className="bg-black border-gray-700 text-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                  <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={handleAddNewIdea}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Idea
                  </Button>
                </div>

                <div className="mb-6">
                  <Input
                      type="text"
                      placeholder="Filter by tags"
                      className="bg-black border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIdeas.map((idea) => {
                    // Ensure tags is an array. If tags is a string, split it into an array.
                    let tags: string[] = [];
                    if (Array.isArray(idea.tags)) {
                      tags = idea.tags;
                    } else if (typeof idea.tags === "string") {
                      tags = idea.tags
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean);
                    }
                    return (
                        <div
                            key={idea.id}
                            className="bg-gray-300 text-black rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleIdeaClick(idea)}
                        >
                          <h3 className="text-lg font-semibold mb-2">{idea.title}</h3>
                          <p className="text-gray-600 mb-4">{idea.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {tags.length > 0 ? (
                                tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                                    >
                            {tag}
                          </span>
                                ))
                            ) : (
                                <span className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-800">
                          No Tags
                        </span>
                            )}
                          </div>
                          <div className="mb-4">
                      <span
                          className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                              idea.status
                          )}`}
                      >
                        {idea.status}
                      </span>
                          </div>
                          <div className="flex -space-x-2">
                            {idea.assignees && idea.assignees.length > 0 ? (
                                idea.assignees.map((user, index) => (
                                    <div
                                        key={`${idea.id}-${user}-${index}`}
                                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs"
                                    >
                                      {user.charAt(0).toUpperCase()}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-gray-500">
                                  No assignees
                                </div>
                            )}
                          </div>
                        </div>
                    );
                  })}
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default Dashboard;

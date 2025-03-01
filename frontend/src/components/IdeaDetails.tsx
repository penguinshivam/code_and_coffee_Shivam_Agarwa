import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X, Edit, Trash, Zap } from "lucide-react";
import type { ExtendedIdea } from "@/pages/Dashboard"; // Ensure ExtendedIdea is defined appropriately

// Type Definitions
export type IdeaStatus = "Draft" | "In Progress" | "Completed";

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[]; // Expected to be an array of strings, but ExtendedIdea might allow string too
  status: IdeaStatus;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface IdeaDetailsProps {
  idea: ExtendedIdea; // Note: ExtendedIdea may have tags: string | string[]
  onClose: () => void;
}

const IdeaDetails: React.FC<IdeaDetailsProps> = ({ idea, onClose }) => {
  // Render tags with a type guard to check if idea.tags is an array
  const renderTags = () => {
    if (Array.isArray(idea.tags)) {
      return idea.tags.map((tag) => (
          <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs ${
                  tag === "Design"
                      ? "bg-blue-100 text-blue-700"
                      : tag === "Development"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
              }`}
          >
          {tag}
        </span>
      ));
    } else if (typeof idea.tags === "string") {
      // If tags is a string, display it as a single tag.
      return (
          <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
          {idea.tags}
        </span>
      );
    }
    return null;
  };

  // Handler for the delete action
  const handleDelete = async () => {
    try {
      // Adjust the endpoint according to your backend API routing
      const response = await fetch(`http://localhost:8080/api/ideas/${idea.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the idea");
      }
      alert("Idea deleted successfully");
      onClose();
    } catch (error) {
      console.error("Error deleting idea:", error);
      alert("Error deleting idea");
    }
  };

  // Handler for the AI Help action
  const handleAiHelp = async () => {
    try {
      // Prepare query parameters for the AI plan generation endpoint
      const params = new URLSearchParams({
        Domain: idea.category,
        BriefIdeaDescription: idea.description,
        KeyFocusAreas: "Cost-efficiency and high engagement", // Adjust as needed
        TargetAudienceUsers: "Young adults aged 18-30", // Adjust as needed
      });

      const response = await fetch(`http://localhost:8080/api/plan?${params.toString()}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to generate AI help");
      }
      const result = await response.text();
      // Display the AI help result (consider a modal or dedicated UI in a real app)
      alert("AI Help:\n" + result);
    } catch (error) {
      console.error("Error generating AI help:", error);
      alert("Error generating AI help");
    }
  };

  return (
      <div className="bg-black text-white animate-fade-up">
        {/* Header with title and actions */}
        <div className="bg-white text-black p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{idea.title}</h2>
          <div className="flex gap-2">
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="h-4 w-4 mr-2" /> Delete
            </Button>
            <Button variant="secondary" onClick={handleAiHelp}>
              <Zap className="h-4 w-4 mr-2" /> AI Help
            </Button>
            <Button variant="outline" onClick={onClose} className="ml-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Main content area with tabs */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="bg-white text-black rounded-lg shadow-sm">
              <TabsList className="border-b w-full rounded-t-lg rounded-b-none p-0">
                <TabsTrigger
                    value="overview"
                    className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                    value="discussion"
                    className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Discussion
                </TabsTrigger>
                <TabsTrigger
                    value="activity"
                    className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Activity Log
                </TabsTrigger>
                <TabsTrigger
                    value="attachments"
                    className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                >
                  Attachments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6">
                <h3 className="text-xl font-bold mb-4">Overview</h3>
                <p className="mb-4">{idea.description}</p>
                <div className="space-y-2">
                  <p>
                    <strong>Owner:</strong> John Doe
                  </p>
                  <p>
                    <strong>Status:</strong> {idea.status}
                  </p>
                  <p>
                    <strong>Timeline:</strong> Expected completion by next month.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="p-6">
                <h3 className="text-xl font-bold mb-4">Discussion</h3>
                <p className="text-gray-500">
                  No comments yet. Be the first to start a discussion.
                </p>
              </TabsContent>

              <TabsContent value="activity" className="p-6">
                <h3 className="text-xl font-bold mb-4">Activity Log</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600">
                    <span className="text-gray-400">Today, 2:30 PM</span> - Idea created by John Doe
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="attachments" className="p-6">
                <h3 className="text-xl font-bold mb-4">Attachments</h3>
                <p className="text-gray-500">No attachments yet.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar with contributors and tags */}
          <div className="w-80 space-y-4">
            {/* Contributors */}
            <div className="bg-white text-black p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">Contributors</h3>
              <ul className="space-y-1">
                <li>John Doe - Owner</li>
                <li>Alice - Contributor</li>
                <li>Bob - Contributor</li>
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-white text-black p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {renderTags()}
                {/* Additional static tags */}
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                Innovation
              </span>
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                Collaboration
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default IdeaDetails;

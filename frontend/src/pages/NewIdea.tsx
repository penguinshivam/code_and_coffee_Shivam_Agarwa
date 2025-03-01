import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import type { Idea, IdeaStatus } from "@/types/idea";

const categories = ["Mobile", "Web", "AI/ML", "IoT", "Blockchain", "Other"];

// Adjust this to match your actual backend API endpoint
const BACKEND_API_URL = "http://localhost:8080/api/ideas";

const NewIdea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    priority: "Medium",
    status: "Draft" as IdeaStatus,
  });

  const handleChange = (
      e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      priority: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation for required fields
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and Description are required fields.",
        variant: "destructive",
      });
      return;
    }

    // Construct the Idea object to send to the backend
    const newIdea: Idea = {
      // The backend might auto-generate an ID, so you can omit this if the backend does it
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      // If you have more fields like priority or tags on the backend, include them:
      priority: formData.priority,
      tags: formData.tags.split(",").map((t) => t.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current-user", // Replace with actual user ID when auth is implemented
    };

    try {
      // POST the new idea to the backend
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIdea),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      toast({
        title: "Success!",
        description: "Your idea has been created on the server.",
      });
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Error creating idea:", error);
      toast({
        title: "Error",
        description: "Failed to create idea. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Parse tags for preview
  const previewTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

  return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Form */}
            <div className="w-full md:w-2/3 bg-black text-white rounded-lg shadow p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                      id="title"
                      name="title"
                      placeholder="Enter a concise and descriptive title for your idea."
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-black text-white p-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your idea in detail..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-black text-white p-2 focus:border-blue-500 focus:outline-none min-h-[150px]"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                      id="tags"
                      name="tags"
                      placeholder="Add relevant tags (e.g., #innovation, #design)."
                      value={formData.tags}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-black text-white p-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                      id="category"
                      name="category"
                      placeholder="Select or enter a category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-black text-white p-2 focus:border-blue-500 focus:outline-none"
                      list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((category) => (
                        <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <Label>Priority Level</Label>
                  <RadioGroup
                      value={formData.priority}
                      onValueChange={handlePriorityChange}
                      className="flex space-x-8 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                          value="Low"
                          id="low"
                          className="h-4 w-4 rounded-full border border-gray-300 data-[state=checked]:bg-white"
                      />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                          value="Medium"
                          id="medium"
                          className="h-4 w-4 rounded-full border border-gray-300 data-[state=checked]:bg-white"
                      />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                          value="High"
                          id="high"
                          className="h-4 w-4 rounded-full border border-gray-300 data-[state=checked]:bg-white"
                      />
                      <Label htmlFor="high">High</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Attachments</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-1 text-center">
                    <p className="text-gray-500">
                      Drop files here or click to upload
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contributors">Add Contributors</Label>
                  <Input
                      id="contributors"
                      placeholder="Search and add contributors..."
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-black text-white p-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </form>
            </div>

            {/* Right Column - Preview and Tips */}
            <div className="w-full md:w-1/3 space-y-6">
              {/* Preview Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Preview Your Idea</h2>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">
                    {formData.title || "Idea Title"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {formData.description || "Short description of the idea..."}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {previewTags.length > 0 ? (
                        previewTags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                        #{tag}
                      </span>
                        ))
                    ) : (
                        <>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        #innovation
                      </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        #design
                      </span>
                        </>
                    )}
                  </div>

                  <p className="text-sm mt-3">Priority: {formData.priority}</p>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Tips for a Great Idea</h2>
                <ul className="space-y-2 text-sm">
                  <li>Keep your title concise.</li>
                  <li>Add detailed descriptions to clarify.</li>
                  <li>Use tags to make your idea discoverable.</li>
                </ul>

                <Button className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600">
                  Collab
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between mt-8">
            <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
            >
              Save Idea
            </Button>
            <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
  );
};

export default NewIdea;

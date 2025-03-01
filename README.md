# Idea Vault

Idea Vault is a web application for managing and collaborating on innovative ideas. Users can create, preview, and manage ideas using a rich form interface and view detailed information about each idea. Built with React, TypeScript, and Tailwind CSS, the project integrates with a backend API for data persistence and features additional functionalities like AI-powered plan generation.

## Features

- **Create New Ideas:**  
  Fill out a comprehensive form to add new ideas with title, description, tags, category, priority, and attachments.
  
- **Real-Time Preview:**  
  Preview your idea before submission to see how it will be displayed.
  
- **Form Validation:**  
  Required fields such as Title and Description are validated to ensure quality submissions.
  
- **Customizable Priority:**  
  Set the priority level (Low, Medium, High) using a custom radio button component styled with Tailwind CSS.
  
- **Tag & Category Support:**  
  Easily add tags and select from predefined categories to improve idea discoverability.
  
- **AI Help Integration:**  
  (In the IdeaDetails component) Request an AI-generated plan by sending idea details to a backend API.
  
- **Consistent Dark Theme:**  
  All input fields and text areas are styled with a black background and white text for a modern, consistent UI.

## Technologies Used

- **React & TypeScript:** For building a robust and type-safe user interface.
- **Tailwind CSS:** For utility-first styling.
- **React Router:** For client-side routing.
- **Custom UI Components:** (e.g., Button, Input, Textarea, Label, RadioGroup) to maintain a cohesive design.
- **Backend API Integration:**  
  The frontend communicates with a backend service (e.g., `http://localhost:8080/api/ideas`) for CRUD operations.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/idea-manager.git
   cd idea-manager

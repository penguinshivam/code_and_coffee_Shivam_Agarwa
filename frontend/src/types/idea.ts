
export type IdeaStatus = "Draft" | "In Progress" | "Completed";

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags:string|string[];
  priority:string;
  status: IdeaStatus;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

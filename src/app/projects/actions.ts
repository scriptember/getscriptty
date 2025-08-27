"use server";

import type { GenerateProjectTitleInput } from "@/ai/flows/project-title-generator";

export async function generateTitleAction(input: GenerateProjectTitleInput) {
  try {
    // This is a placeholder for static export.
    // In a server environment, this would call the AI flow.
    const mockTitle = `Awesome ${input.tags.join(" ")} Project`;
    return { success: true, title: mockTitle };
  } catch (error) {
    console.error("Error generating project title:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to generate title: ${errorMessage}` };
  }
}

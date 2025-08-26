"use server";

import {
  generateProjectTitle,
  GenerateProjectTitleInput,
} from "@/ai/flows/project-title-generator";

export async function generateTitleAction(input: GenerateProjectTitleInput) {
  try {
    const result = await generateProjectTitle(input);
    if (!result || !result.title) {
      throw new Error("AI failed to generate a title.");
    }
    return { success: true, title: result.title };
  } catch (error) {
    console.error("Error generating project title:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to generate title: ${errorMessage}` };
  }
}

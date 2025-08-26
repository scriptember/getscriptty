'use server';

/**
 * @fileOverview An AI agent that generates project titles based on project tags.
 *
 * - generateProjectTitle - A function that generates a project title based on the given tags.
 * - GenerateProjectTitleInput - The input type for the generateProjectTitle function.
 * - GenerateProjectTitleOutput - The return type for the generateProjectTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectTitleInputSchema = z.object({
  tags: z.array(z.string()).describe('An array of tags associated with the project.'),
});
export type GenerateProjectTitleInput = z.infer<typeof GenerateProjectTitleInputSchema>;

const GenerateProjectTitleOutputSchema = z.object({
  title: z.string().describe('The generated project title.'),
});
export type GenerateProjectTitleOutput = z.infer<typeof GenerateProjectTitleOutputSchema>;

export async function generateProjectTitle(input: GenerateProjectTitleInput): Promise<GenerateProjectTitleOutput> {
  return generateProjectTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectTitlePrompt',
  input: {schema: GenerateProjectTitleInputSchema},
  output: {schema: GenerateProjectTitleOutputSchema},
  prompt: `You are an AI that generates creative and descriptive titles for projects based on their tags.

  Given the following tags, generate a project title that reflects the project's theme and genre.
  The title should be concise and engaging.

  Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  `,
});

const generateProjectTitleFlow = ai.defineFlow(
  {
    name: 'generateProjectTitleFlow',
    inputSchema: GenerateProjectTitleInputSchema,
    outputSchema: GenerateProjectTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

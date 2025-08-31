
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import { generateProjectTitle } from "@/ai/flows/project-title-generator";

const formSchema = z.object({
  tags: z.string().min(1, "Please enter at least one tag."),
});

export default function AiTitleForm() {
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedTitle("");
    const tagsArray = values.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    try {
        const result = await generateProjectTitle({ tags: tagsArray });
        setGeneratedTitle(result.title);
    } catch (error) {
        console.error("Error generating title:", error);
        toast({
            variant: "destructive",
            title: "Error Generating Title",
            description: "Could not generate a title. Please try again."
        });
    } finally {
        setIsLoading(false);
    }
  }
  
  const handleCopy = () => {
    if (!generatedTitle) return;
    navigator.clipboard.writeText(generatedTitle);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., react, firebase, machine-learning, game"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                "Generating..."
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Title
                </>
              )}
            </Button>
          </form>
        </Form>
        
        {(isLoading || generatedTitle) && (
            <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggested Title:</h3>
                {isLoading ? (
                    <Skeleton className="h-10 w-full" />
                ) : (
                    <Card className="bg-background relative">
                        <div className="p-4 pr-12 font-mono text-lg text-primary">
                            {generatedTitle}
                        </div>
                        <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2" onClick={handleCopy}>
                            {hasCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                            <span className="sr-only">Copy</span>
                        </Button>
                    </Card>
                )}
            </div>
        )}
      </CardContent>
    </Card>
  );
}

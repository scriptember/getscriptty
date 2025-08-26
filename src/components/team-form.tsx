"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Rocket } from "lucide-react";

const formSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters long.").max(50, "Team name must be 50 characters or less."),
  projectIdea: z.string().min(10, "Please briefly describe your project idea.").max(500, "Project description must be 500 characters or less."),
});

export default function TeamForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      projectIdea: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Here you would typically make an API call to create the team
    console.log("Creating team with values:", values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Team Created Successfully!",
      description: `Your team "${values.teamName}" is ready.`,
    });
    
    router.push("/dashboard"); // Redirect to a dashboard or home page after creation
    setIsLoading(false);
  }
  
  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., The Code Crusaders"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectIdea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Idea / Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you plan to build. What problem are you solving?"
                      className="resize-none"
                      rows={5}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                "Creating Team..."
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Create Team
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


"use client";

import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Github } from "lucide-react";
import { Separator } from "./ui/separator";
import { useAuth } from "@/hooks/use-auth";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.618-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.546,44,29.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
);

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function RegisterForm() {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('register');
  const { user, signInWithGoogle, signInWithGitHub, createUserWithEmail, signInWithEmail } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/redirecting");
    }
  }, [user, router]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEmailLoading(true);
    if (authMode === 'register') {
      await createUserWithEmail(values.email, values.password);
    } else {
      await signInWithEmail(values.email, values.password);
    }
    setIsEmailLoading(false);
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsSocialLoading(true);
    if (provider === 'google') {
        await signInWithGoogle();
    } else if (provider === 'github') {
        await signInWithGitHub();
    }
    setIsSocialLoading(false);
  };
  
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
            {authMode === 'register' ? 'Create an Account' : 'Sign In'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
             <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={isSocialLoading || isEmailLoading}>
                <GoogleIcon className="mr-2 h-5 w-5"/> Continue with Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('github')} disabled={isSocialLoading || isEmailLoading}>
                <Github className="mr-2 h-5 w-5"/> Continue with GitHub
            </Button>
        </div>
        
        <div className="flex items-center gap-4 my-6">
            <Separator className="flex-1"/>
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1"/>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      disabled={isEmailLoading || isSocialLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        disabled={isEmailLoading || isSocialLoading}
                      />
                       <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isEmailLoading || isSocialLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isEmailLoading || isSocialLoading} className="w-full">
                {isEmailLoading ? 'Processing...' : (authMode === 'register' ? 'Create Account' : 'Sign In')}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
            {authMode === 'register' ? (
                <>
                    Already have an account?{' '}
                    <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode('signin')}>
                        Sign In
                    </Button>
                </>
            ) : (
                 <>
                    Don't have an account?{' '}
                    <Button variant="link" className="p-0 h-auto" onClick={() => setAuthMode('register')}>
                        Register
                    </Button>
                </>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

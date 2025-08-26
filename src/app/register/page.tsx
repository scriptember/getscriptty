import RegisterForm from "@/components/register-form";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
            <UserPlus className="h-10 w-10"/>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Create Your Account
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Join Scriptember today to start building, learning, and winning.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <RegisterForm />
      </div>

    </div>
  );
}

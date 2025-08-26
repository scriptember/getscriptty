"use server";

import * as z from "zod";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function registerUserAction(input: z.infer<typeof registerSchema>) {
  try {
    const validatedInput = registerSchema.parse(input);
    const auth = getAuth(app);
    
    await createUserWithEmailAndPassword(auth, validatedInput.email, validatedInput.password);

    return { success: true };
  } catch (error: any) {
    let errorMessage = "An unknown error occurred.";
    if (error.code) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email address is already in use by another account.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'The email address is not valid.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled.';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is not strong enough.';
                break;
            default:
                errorMessage = error.message;
        }
    } else if (error instanceof z.ZodError) {
        errorMessage = error.errors.map(e => e.message).join(', ');
    }
    
    console.error("Error registering user:", error);
    return { success: false, error: errorMessage };
  }
}

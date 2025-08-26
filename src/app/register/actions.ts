"use server";

import * as z from "zod";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function handleAuthError(error: any) {
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
                errorMessage = 'This sign-in method is not enabled.';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is not strong enough.';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = 'Invalid email or password.';
                break;
            case 'auth/account-exists-with-different-credential':
                 errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
                 break;
            default:
                errorMessage = error.message;
        }
    } else if (error instanceof z.ZodError) {
        errorMessage = error.errors.map(e => e.message).join(', ');
    }
    
    console.error("Authentication Error:", error);
    return { success: false, error: errorMessage };
}

export async function registerUserAction(input: z.infer<typeof registerSchema>) {
  try {
    const validatedInput = registerSchema.parse(input);
    const auth = getAuth(app);
    
    try {
      await signInWithEmailAndPassword(auth, validatedInput.email, validatedInput.password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        await createUserWithEmailAndPassword(auth, validatedInput.email, validatedInput.password);
      } else {
        throw error;
      }
    }

    return { success: true };
  } catch (error: any) {
    return handleAuthError(error);
  }
}

// This action is a placeholder for client-side social login.
// Firebase social sign-in is best handled on the client.
// This action normalizes the success/error response.
export async function socialLoginAction(provider: "google" | "github") {
  // The actual sign-in logic will be in the component.
  // We have this action to keep the pattern consistent.
  // In a real app, you might use this to link accounts or store user data.
  console.log(`Social login attempt with ${provider}`);
  try {
    // This is where you would handle server-side logic if needed,
    // but signInWithPopup is client-side. The component will handle it.
    // We return success here and let the client do the work.
    return { success: true };
  } catch(error) {
    return handleAuthError(error);
  }
}

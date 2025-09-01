
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

export interface AppUser {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    isAdmin: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  createUserWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (firebaseUser: FirebaseUser, appUser: AppUser) => {
    setUser(appUser);
    toast({
        title: "Authentication Successful",
        description: `Welcome, ${appUser.displayName || appUser.email}!`,
    });
    router.push("/redirecting");
  }

  const manageUserDocument = async (firebaseUser: FirebaseUser): Promise<AppUser> => {
      const userRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
          return docSnap.data() as AppUser;
      } else {
          const newAppUser: AppUser = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
              isAdmin: false,
          };
          try {
            await setDoc(userRef, newAppUser);
          } catch (error) {
              console.error("Error creating user document:", error);
              // We can choose to ignore this error and still let the user log in.
              // The app can function without the DB record, they just won't be an admin.
          }
          return newAppUser;
      }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const appUser = await manageUserDocument(firebaseUser);
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithProvider = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, provider);
        const appUser = await manageUserDocument(result.user);
        handleLogin(result.user, appUser);
    } catch (error: any) {
        console.error("Error signing in with provider:", error);
        toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: error.message || "An unexpected error occurred. Please try again.",
        });
    } finally {
        setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithProvider(provider);
  };
  
  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    await signInWithProvider(provider);
  };

  const createUserWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        const appUser = await manageUserDocument(result.user);
        handleLogin(result.user, appUser);
    } catch (error: any) {
         console.error("Error creating user:", error);
         toast({
            variant: "destructive",
            title: "Registration Failed",
            description: error.message || "Could not create account. Please try again.",
        });
    } finally {
        setLoading(false);
    }
  };
  
  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        const result = await signInWithEmailAndPassword(auth, email, pass);
        const appUser = await manageUserDocument(result.user);
        handleLogin(result.user, appUser);
    } catch (error: any) {
         console.error("Error signing in:", error);
         toast({
            variant: "destructive",
            title: "Sign In Failed",
            description: error.message || "Invalid credentials. Please try again.",
        });
    } finally {
        setLoading(false);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log out. Please try again.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithGitHub, createUserWithEmail, signInWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Layers, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const isRegistered = searchParams.get("registered") === "true";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    urlError ? "Authentication failed. Please check your credentials." : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: trimmedEmail,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setError(null);
    setIsGitHubLoading(true);
    try {
      await signIn("github", { callbackUrl });
    } catch {
      setError("Failed to start GitHub sign in.");
      setIsGitHubLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 shadow-xl backdrop-blur">
      {/* Header */}
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center gap-2 font-semibold text-foreground tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">DevStash</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground pt-2">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your developer knowledge hub
        </p>
      </div>

      {/* Registration Success Alert */}
      {isRegistered && !error && (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Account created successfully. Please sign in.</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-foreground"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="demo@devstash.io"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isGitHubLoading}
            className="h-9"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium text-foreground"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || isGitHubLoading}
            className="h-9"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading || isGitHubLoading}
          className="w-full font-semibold cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* GitHub Sign In */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleGitHubSignIn}
        disabled={isLoading || isGitHubLoading}
        className="w-full gap-2 font-medium cursor-pointer"
      >
        {isGitHubLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GitHubIcon className="h-4 w-4" />
        )}
        <span>Sign in with GitHub</span>
      </Button>

      {/* Link to Register */}
      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline underline-offset-4"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
            Loading...
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </main>
  );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must not exceed 20 characters.",
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores and hyphens.",
    }),
});

interface UsernameRegistrationProps {
  onComplete: (username: string) => void;
}

export function UsernameRegistration({
  onComplete,
}: UsernameRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Check if username exists
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("username", values.username)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        toast({
          variant: "destructive",
          title: `Welcome back, ${values.username}!`,
        });
        onComplete(values.username);
        setIsLoading(false);
        return;
      }

      // Insert the user directly without auth
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            username: values.username,
            high_score: 0,
          },
        ])
        .select();

      if (userError) throw userError;

      // Store in local storage
      localStorage.setItem("wanderwhiz_username", values.username);

      toast({
        title: "Registration successful!",
        description: `Welcome, ${values.username}!`,
      });

      // Call onComplete to update the username in the parent component
      onComplete(values.username);

      // We don't need the setTimeout here anymore as we're handling it in ChallengeDialog
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold text-center">Choose a Username</h2>
      <p className="text-muted-foreground text-center">
        Create a username to challenge friends and track your scores.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a unique username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

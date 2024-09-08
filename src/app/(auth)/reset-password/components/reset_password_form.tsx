"use client";

import { db } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState<boolean>(false);

  const passwordShape = z.string().min(8, {
    message: "Password must be at least 8",
  });

  const shape = z
    .object({
      password: passwordShape,
      confirm_password: passwordShape,
    })
    .superRefine(({ confirm_password, ...rest }, ctx) => {
      if (confirm_password !== rest.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirm_password"],
        });
      }
      return true;
    });

  const resetPasswordShape = shape;

  const form = useForm<z.infer<typeof resetPasswordShape>>({
    resolver: zodResolver(resetPasswordShape),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const inputValues = form.watch();

  async function ResetPassword(formData: z.infer<typeof resetPasswordShape>) {
    const { password } = formData;

    try {
      setIsPending(true);
      const { error, data } = await db.auth.updateUser({ password });

      if (error) {
        toast.error(error.message);
        setIsPending(false);
        return;
      }

      if (data) {
        toast.success("Password reset successfully!");
        router.push("/sign-in");
      }
      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
    }
  }
  return (
    <main className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(ResetPassword)}>
          <Card className="mx-auto font-sans w-[400px] flex flex-col items-center justify-center pt-4">
            <CardHeader className="w-full">
              <CardTitle className="text-2xl font-sans">
                Reset Password
              </CardTitle>
              <CardDescription>
                Use the form provided below to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Enter New Password </Label>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="New Password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirm_password">
                      Confirm New Password
                    </Label>
                    <FormControl>
                      <Input
                        id="confirm_password"
                        type="password"
                        placeholder="Confirm New Password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full flex items-center justify-center disabled:cursor-not-allowed"
                disabled={
                  (inputValues.password.length === 0 &&
                    inputValues.confirm_password.length < 1) ||
                  isPending
                }
              >
                {isPending ? (
                  <Loader2 className="animate-spin " />
                ) : (
                  "Reset Password"
                )}
              </Button>
              <div className="text-center">
                <Link href="/sign-in" className="text-sm font-medium">
                  Remember your password?{" "}
                  <span className="underline visited:text-primary">
                    {" "}
                    Log in
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}

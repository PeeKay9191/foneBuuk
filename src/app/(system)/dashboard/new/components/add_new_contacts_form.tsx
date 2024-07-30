"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { formSchema } from "@/validations/add_new_contact_schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

export default function AddNewContactForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const {
      data: { user },
    } = await db.auth.getUser();

    const user_id = user?.id;

    const { full_name, email, phone_number, address } = values;

    try {
      const { error } = await db
        .from("contacts")
        .insert([
          {
            full_name,
            email,
            phone_number,
            address,
            user_id,
          },
        ])
        .select();

      if (!error) {
        toast.success("New contact has been created successfully", {
          description: "Kindly go to your dashboard to view it.",
        });
        form.reset();
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to create contact.", {
          description: "Kindly try again in few minutes.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container md:w-[1200px] mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Add New Contact</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the person's full name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the person's email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the person's mobile number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the person's address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full md:w-[5rem] flex items-center justify-center disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin " /> : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

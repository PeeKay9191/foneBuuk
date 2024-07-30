"use client";
import React, { useEffect, useState } from "react";
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
import { formSchema } from "@/validations/add_new_contact_schema";
import { Loader2, Router } from "lucide-react";
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ContactShape {
  id: string;
  full_name: string;
  address: string;
  email: string;
  phone_number: string;
}

type Props = {
  singleContact: ContactShape;
};

export default function EditContactForm({ singleContact }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: singleContact.full_name,
      email: singleContact.email,
      phone_number: singleContact.phone_number,
      address: singleContact.address,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { full_name, phone_number, email, address } = values;

    try {
      const { error } = await db
        .from("contacts")
        .update({
          full_name,
          email,
          phone_number,
          address,
        })
        .eq("id", singleContact.id)
        .single();

      if (!error) {
        toast.success("Contact updated successfully!", {
          description: "Your contact has been updated successfully.",
        });
        form.reset();
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to update contact.", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container mx-auto space-y-3">
        <h1 className="text-2xl font-bold">Update Contact Details</h1>
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
              {isLoading ? (
                <Loader2 className="animate-spin " />
              ) : (
                "Update Contact"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

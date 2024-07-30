"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { formSchema } from "@/validations/add_new_contact_schema";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {};

export default function AddContacts({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        setIsOpen(false);
        form.reset();
        setIsLoading(false);
        window.location.reload();
      } else {
        toast.error("Failed to create contact.", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="mt-4 bg-black hover:bg-black/80 ease-in-out transition-all duration-100 text-white py-2 px-4 rounded-lg font-semibold">
        Add Contact
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kindly fill in the form below</DialogTitle>
          <DialogDescription>
            Use the form below to add a new contact to your list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              className="w-full flex items-center justify-center disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin " /> : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  id: string;
};

export default function DeleteContact({ id }: Props) {
  const handleContactDeletion = async () => {
    const { error } = await db.from("contacts").delete().eq("id", id);

    toast.success("Contact deleted successfully!", {
      description: "Your contact has been removed from your contacts list.",
    });

    window.location.reload(); // Refresh the page to reflect the changes.

    if (error) {
      toast.error("Something went wrong!", {
        description: "Kindly refresh the page and try again!",
      });
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2 className="text-gray-600 hover:text-gray-400 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              contact from your list of contacts and remove the data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleContactDeletion}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

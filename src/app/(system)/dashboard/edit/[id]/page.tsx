import React from "react";
import EditContactForm from "./components/edit_contact_form";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

export default async function EditContactPage({ params: { id } }: Props) {
  const db = dbServer(cookies);

  const { data: singleContact } = await db
    .from("contacts")
    .select()
    .eq("id", id)
    .single();

  console.log(singleContact);
  return <EditContactForm singleContact={singleContact} />;
}

import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./components/dashboard_view";

type Props = {};

export default async function Page({}: Props) {
  const db = dbServer(cookies);

  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  // Fetches the contacts
  const { data: contacts, error } = await db
    .from("contacts")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <DashboardView user={user.user_metadata.firstName} contacts={contacts} />
    </>
  );
}

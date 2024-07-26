import SignoutButton from "@/components/signout";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function Dashboard({}: Props) {
  const db = dbServer(cookies);

  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col w-96 mx-auto">
      <h1>Dashboard</h1>
      <h2>Welcome, {user?.user_metadata.firstName}</h2>
      <SignoutButton />
    </div>
  );
}

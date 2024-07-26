"use client";
import { db } from "@/lib/supabase";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {};

export default function SignoutButton({}: Props) {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await db.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };
  return (
    <Button className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}

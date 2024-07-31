import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { BookUser, Phone } from "lucide-react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="flex items-centet w-full justify-between">
      <a
        href="/"
        className="text-2xl font-bold flex gap-x-2 items-center text-gray-800"
      >
        <BookUser size={30} className="text-gray-800 h-6 w-6" />
        foneBuuk
      </a>
      <ul className="flex items-center justify-center gap-x-4 hidden md:inline-flex">
        <Button className="px-8 py-2 rounded-full ">
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button
          variant={"outline"}
          className="rounded-full px-8 py-2 border border-gray-500"
        >
          <Link href="/sign-in">Login</Link>
        </Button>
      </ul>
    </nav>
  );
}

import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default function Hero() {
  return (
    <section id="hero" className=" p-4">
      {/*---------GRID LINES-------*/}
      <div className="flex w-full h-full fixed top-0 left-0 z-[-20]">
        <div className="lines" />
        <div className="lines" />
        <div className="lines" />
      </div>
      <div className=" w-full lg:w-4/5 mx-auto grid gap-6 place-content-center h-full md:h-[70lvh]">
        <h1
          className="text-[2.5rem] border-y border-dashed border-y-neutral-300 dark:border-y-neutral-600 lg:text-7xl py-8  text-center font-extrabold capitalize bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-zinc-300 via-black to-zinc-400 
          dark:from-gray-300 dark:via-white dark:to-neutral-900 text-transparent bg-clip-text"
        >
          Your <span className="marker">Contemporary</span> Contact Management
          Platform
        </h1>

        <p className="text-center text-base md:text-lg w-full lg:w-4/5 dark:text-zinc-300 mx-auto">
          Welcome to foneBuuk, the ultimate contact management solution tailored
          for modern professionals. Effortlessly organize and manage your
          contacts, streamline communication, and enhance your networking
          capabilities.
        </p>

        <div className="flex items-center w-fit mx-auto gap-6 tracking-wider">
          <Button className="py-4 rounded-full">
            <Link href="/sign-in">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

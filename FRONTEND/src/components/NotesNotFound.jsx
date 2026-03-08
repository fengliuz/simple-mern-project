import { NotebookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function NotesNotFound() {
  return (
    <div className="min-h-screen gap-6 py-20 w-full flex items-center flex-col">
      <h1 className="font-bold font-mono text-center  ">Note data is empty</h1>
      <div className="rounded-full animate-pulse p-8 bg-primary/10 border-secondary border">
        <NotebookIcon className="size-10 text-primary"/>
      </div>
      <Link className=" w-fit bg-primary/20 p-2 rounded-2xl animate-none  hover:bg-primary/30 hover:text-secondary transition-all duration-300" to="/create">Start Create and Organize your note</Link>
    </div>
  );
}

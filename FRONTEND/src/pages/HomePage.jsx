import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { LoaderIcon } from "lucide-react";
// import { useNavigate } from 'react-router'

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        const nextNotes = res.data.data;
        setNotes(nextNotes);
      } catch (error) {
        console.log(error.response.data);
        if (error.response.status === 429) {
          setRateLimited(true);
        } else {
          const errorMessages = error.response.data.errors;
          console.log(errorMessages);
          toast.error(
            "failed to get data\n" + errorMessages.map((m) => m.message),
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
  const handleDelete = async (selectedId) => {
    try {
      await api.delete(`/notes/${selectedId}`);
      setNotes((prev) => prev.filter((n) => n._id !== selectedId));
    } catch (error) {
      toast.error("Fail to delete the note \n", error);
    }
  };
  if (isLoading) {
    return (
      <div className=" min-h-screen">
        <div className="inset-0 grid place-items-center place-content-center fixed">
          <h1 className="font-bold font-mono animate-pulse text-2xl">
            Is Loading...
          </h1>
          <LoaderIcon className="animate-spin size-10"/>
        </div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen">
      {isRateLimited && <RateLimited onRateLimited={setRateLimited} />}
      {notes.length <= 0 && (<NotesNotFound/>)}
      <div className="max-w-7xl mx-auto p-4 mt-6 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
          {notes?.map((note) => (
            <NoteCard note={note} key={note._id} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

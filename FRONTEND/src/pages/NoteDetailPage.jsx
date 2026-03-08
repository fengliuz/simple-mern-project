import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        const nextNote = res.data.data;
        setNote(nextNote);
      } catch (error) {
        console.log(error);
        toast.error("Error retrieving note data");
      }finally{
        setLoading(false)
      }
    };
    fetchNote();
  }, [id]);
    if (loading) {
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
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
       await api.put(`/notes/${id}`,{title:note.title,description:note.description})
      toast.success("Success Updating note data")
      navigate("/")
    } catch (error) {
       toast.error("Fail to delete the note \n", error);
    }finally{
      setSaving(false)
    }
  };
   const handleDelete = async (e) => {
    e.preventDefault()
    if(!window.confirm("Are You Sure want to delete this note?"))return
    try {
      await api.delete(`/notes/${id}`);
      navigate("/")
    } catch (error) {
      toast.error("Fail to delete the note \n", error);
    }
  };
  return (
    <div className=" min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between max-w-2xl mx-auto">
          <Link to="/">
            <button className=" btn btn-ghost bg-base-300 hover:bg-base-100 ">
              <ArrowLeftIcon />
              Back to Notes page
            </button>
          </Link>
            <button onClick={handleDelete} className=" btn btn-ghost bg-base-300 hover:bg-base-100 text-error">
              Delete <Trash2Icon className="" />
            </button>

        </div>
          <div className="card mt-10 bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Update Note</h2>
              <form action="" onSubmit={handleUpdate}>
                <div className="form-control mb-4 w-full flex gap-1 lg:flex-col justify-around">
                  <div className="mb-5">
                    <label htmlFor="title" className="label">
                      <span className="label-text">Title:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note Title"
                      className=" input input-bordered w-full focus:input-primary transition-all duration-150"
                      id="title"
                      value={note.title}
                      onChange={(e) => setNote({...note,title:e.target.value})}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="description" className="label">
                      <span className="label-text">Description:</span>
                    </label>
                    <textarea
                      placeholder="Note Description"
                      className=" input input-bordered w-full focus:input-secondary transition-all resize-y duration-150 h-1/2"
                      id="description"
                      value={note.description}
                      onChange={(e) => setNote({...note,description:e.target.value})}
                    />
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className={`btn btn-soft btn-primary ${saving ? "animate-pulse" : ""}`}
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

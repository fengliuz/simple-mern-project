import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import RateLimited from "../components/RateLimited";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.post("/notes", {
        title,
        description,
      });
      toast.success("Success create new note");
      navigate("/")
    } catch (error) {
      if (error.response.status === 400) {
        const errors = error.response.data.errors;
        toast.error("Error input data\n" + errors.map((e) => e.message));
      } 
      else if (error.response.status === 429) {
        toast.error("Too many actions please slow down ")
      } else {
        toast.error("ERROR");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className=" min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-7">
        <div className=" max-w-2xl mx-auto">
          <Link to="/">
            <button className=" btn btn-ghost bg-base-300 hover:bg-base-100 ">
              <ArrowLeftIcon />
              Back to Notes page
            </button>
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create Note</h2>
              <form action="" onSubmit={handleSubmit}>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="description" className="label">
                      <span className="label-text">Description:</span>
                    </label>
                    <textarea
                      type="text"
                      placeholder="Note Description"
                      className=" input input-bordered w-full focus:input-secondary transition-all duration-150"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className={`btn btn-soft btn-primary ${isLoading ? "animate-pulse" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

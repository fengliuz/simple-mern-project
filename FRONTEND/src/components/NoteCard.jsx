import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'

export default function NoteCard({note}) {
  return (
              <Link to={`/notes/${note._id}`} className=" bg-slate-800 w-full rounded-sm p-4 hover:-translate-y-0.5 transition-all hover:border-amber-50 border-t-2 border-secondary hover:shadow-md shadow-indigo-900 card-body duration-200">
              <h3 className='card-title text-primary'>{note.title}</h3>
              <p className='font-semibold  font-sans text-secondary line-clamp-6'>
                {note.description}
              </p>
              <div className=" card-actions justify-between items-center mt-4">
                <span className=' text-sm text-secondary/50'>
                Created at: {" "}
                {formatDate(note.createdAt)}
                </span>
                <div className="flex items-center gap-2 ">
                    <PenSquareIcon className='size-4'/>
                    <button className=' btn btn-ghost outline-error hover:outline-1 transition-all duration-500 hover:text-error'>
                        <Trash2Icon className='size-4 '/>
                    </button>
                </div>
              </div>
            </Link>
  )
}

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
// import { useNavigate } from 'react-router'

const HomePage = () => {
  const [isRateLimited,setRateLimited]=useState(false)
  const [notes,setNotes] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes/")
        const nextNotes = res.data.data
        setNotes(nextNotes)
      } catch (error) {
        console.log(error.response.data)
        if(error.response.status === 429){
          setRateLimited(true)
        }else{
          const errorMessages = error.response.data.errors
          console.log(errorMessages)
          toast.error("failed to get data\n"+ errorMessages.map((m)=>m.message))
        }
      }finally{
        setIsLoading(false)
      }
    }
    fetchNotes()
  },[])
  console.log(notes)
  if(isLoading){
    return(
      <div className=" min-h-screen">
        <div className="inset-0 grid place-items-center fixed">
          <h1 className='font-bold font-mono animate-pulse text-2xl'>Is Loading...</h1>
        </div>
      </div>
    )
  }
  return (
    <div className=' min-h-screen'>
      {isRateLimited && <RateLimited onRateLimited={setRateLimited}/>}
      <div className="max-w-7xl mx-auto p-4 mt-6 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes?.map((note)=>(
            <NoteCard note={note} key={note._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

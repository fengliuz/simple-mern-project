import { Note } from "../models/Note.js"

export const getNotes = async(req,res)=>{
    try {
        const notes = await Note.find()
        res.status(200).json({message:"Notes data retrieved successfully",data:notes})
    } catch (error) {
        res.status(500).json({
            message:"SERVER INTERNAL ERROR",
            errors:error
        })
    }
}
export const getDetailNote = async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({
                message:"Data Not Found"
            })
        }
        res.status(200).json({message:"Note data retrieved successfully",data:note})
    } catch (error) {
        res.status(500).json({
            message:"SERVER INTERNAL ERROR",
            errors:error
        })
    }
}
export const createNote = async(req,res)=>{
    try {
        const {title,description} = req.body;
        const note =  new Note({title,description})
        await note.save()
        res.status(201).json({message:"Note created successfully",data:note})
    } catch (error) {
        if(error.name === "ValidationError"){
            const message = Object.values(error.errors).map(val=>val.properties)
                return res.status(400).json({
                message:"Data validation error in requests",
                errors:message
            })
        }
        res.status(500).json({
            message:"SERVER INTERNAL ERROR",
            errors:error
        })
    }
}
export const updateNote = async(req,res)=>{
    try {
        const {title,description} = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id,{title,description},{new:true})
        if(!note){
            return res.status(404).json({
                message:"Data Not Found"
            })
        }
        res.status(200).json({message:"Note updated successfully",data:note})
    } catch (error) {
        res.status(500).json({
            message:"SERVER INTERNAL ERROR",
            errors:error
        })
    }
}
export const deleteNote = async(req,res)=>{
    try {
        const {title,description} = req.body;
        const note = await Note.findByIdAndDelete(req.params.id,{title,description},{new:true})
        if(!note){
            return res.status(404).json({
                message:"Data Not Found"
            })
        }
        res.status(200).json({message:"Note deleted successfully"})
    } catch (error) {
        res.status(500).json({
            message:"SERVER INTERNAL ERROR",
            errors:error
        })
    }
}
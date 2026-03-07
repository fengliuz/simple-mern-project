import express from "express";
const router = express.Router();
// ambil semua note
router.get("/",(req,res)=>{
    res.status(200).send("You just fetch all notes")
})
// buat note
router.post("/",(req,res)=>{
    res.status(201).json({message:"Note created successfully!"})
})
// update note
router.put("/:id",(req,res)=>{
    res.status(200).json({message:"Note updated successfully!"})
})
// hapus note
router.delete("/:id",(req,res)=>{
    res.status(200).json({message:"Note deleted successfully!"})
})


export default router;
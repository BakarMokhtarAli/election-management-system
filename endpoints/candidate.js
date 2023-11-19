import express from "express";
import prisma from "./lib/index.js"
const router = express.Router();
import adminAuthenticate from "./middleware/adminAuthenticate.js";

router.get("/",async(req,res)=>{
    try {
        const candidate = await prisma.candidate.findMany();
        if(!candidate){
            return res.status(404).json({message: 'candidates not found'})
        }
        return res.status(200).json(candidate)
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
});
router.get("/:id",async(req,res)=>{
    try {
        const id = req.params.id * 1;
        const candidate = await prisma.candidate.findUnique({
            where: {
                id: id
            }
        });
        if(!candidate){
            return res.status(404).json({message: 'candidate '+id+ ' not found'})
        }
        return res.status(200).json(candidate)
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
})
router.post("/",adminAuthenticate,async(req,res)=>{
    try {
        const { name, cand_type, email } = req.body;
        const existCandidate = await prisma.candidate.findUnique({
            where: {
                email,
            }
        });
        if(existCandidate){
            return res.status(409).json({message: `candidate already exist`});
        }
        const candidate = await prisma.candidate.create({
            data:{
                name,
                cand_type,
                email
            }
        })
        if(!candidate){
            return res.status(404).json({message: 'can not created candidate'})
        }
        return res.status(200).json({message: `candidate created success!`,candidate})
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
})
router.put("/:id",adminAuthenticate,async(req,res)=>{
    try {
        const id = req.params.id * 1;
        const { name, cand_type,email } = req.body;
        const candidate = await prisma.candidate.update({
            data:{
                name,
                cand_type,
                email
            },
            where:{
                id,
            }
        })
        if(!candidate){
            return res.status(404).json({message: `can not update candidate ${id}`})
        }
        return res.status(200).json({message: `candidate updated success!`,candidate})
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
})
router.delete("/:id",adminAuthenticate,async(req,res)=>{
    try {
        const id = req.params.id * 1;
        const candidate = await prisma.candidate.delete({
            where:{
                id,
            }
        })
        if(!candidate){
            return res.status(404).json({message: `can not delete candidate ${id}`})
        }
        return res.status(200).json({message: `candidate deleted success!`})
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
})


export default router;
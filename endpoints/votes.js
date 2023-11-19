import express from "express";
import prisma from "./lib/index.js"
const router = express.Router();
import Authenticate from "./middleware/Authenticate.js";

router.get("/",async(req,res)=>{
    try {
        const votes = await prisma.votes.findMany();
        if(!votes){
            return res.status(404).json({message: "votes not found!"})
        }
        return res.status(200).json(votes)
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error})
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const id = req.params.id * 1;
        const votes = await prisma.votes.findUnique({
            where:{
                id,
            }
        });
        if(!votes){
            return res.status(404).json({message: `vote ${id} not found!`})
        }
        return res.status(200).json(votes)
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error:error.message})
    }
});
router.post("/",Authenticate,async(req,res)=>{
    try {
        const { voterId, candidateId } = req.body;
        const existingVote = await prisma.votes.findUnique({
            where: {
                    voterId: voterId
            }
                
        })
        console.log("existingVote",existingVote)
        
        if(existingVote){
            return res.status(400).json({message: 'voter already voted!'})
        }
        
        const votes = await prisma.votes.create({
            data:{
                voterId,
                candidateId
            }
        });
        
        if(!votes){
            return res.status(404).json({message: `vote not accepted!`,votes})
        }
        return res.status(200).json(votes)
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error:error.message})
    }
});


export default router;
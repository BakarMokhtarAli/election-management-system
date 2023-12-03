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

router.put("/:id",Authenticate,async(req,res)=>{
    try {
        const id = req.params.id * 1;
        const { candidateId } = req.body;
        if(!id){
            return res.status(404).json({message: "id Not Found!"})
        }
        const voterId = req.decoded.id;
        const vote = await prisma.votes.update({
            data:{
                candidateId: candidateId,
                voterId: voterId
            },
            where:{
                id,
            }
        })
        if(!vote){
            return res.status(404).json({message: `can not update candidate ${id}`})
        }
        return res.status(200).json({message: `vote updated success!`,vote})
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
})

router.delete("/:id",Authenticate,async(req,res)=>{
    try {
        const id = req.params.id * 1;
        const vote = await prisma.votes.delete({
            where:{
                id,
            }
        })
        if(!vote){
            return res.status(404).json({message: `can not delete vote ${id}`})
        }
        return res.status(200).json({message: `vote deleted success!`})
    } catch (error) {
        return res.status(500).json({message:'internal server error',error:error.message})
    }
})


export default router;
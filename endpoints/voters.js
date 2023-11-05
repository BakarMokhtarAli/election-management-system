import express from "express";
import prisma from "./lib/index.js"
const router = express.Router();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

router.get("/",async(req,res)=>{
    try {
        const voter = await prisma.voters.findMany();
        if(!voter){
            res.status(404).json({message:`Voters Not Found`})
        }
        return res.status(200).json(voter);
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error})
    }
});


router.get("/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const voter = await prisma.voters.findUnique({
            where:{
                id: Number(id)
            }
        });
        if(!voter){
            res.status(404).json({message:`Voter ${id} Not Found`})
        }
        return res.status(200).json(voter);
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error: error.message})
    }
});

router.post("/signup",async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const existingVoter = await prisma.voters.findUnique({
            where: {
                email: email
            }
        })
        if(existingVoter){
            return res.status(409).json({message: `email already exist`})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const voter = await prisma.voters.create({
            data:{
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        if(!voter){
            return res.status(404).json({message: `voter can not created`})
        }
        return res.status(200).json({message: `voter created success!`,voter})
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error:error.message})
    }
});

router.post("/signin",async(req,res)=>{
    try {
        const { email, password } = req.body;
        const existingVoter = await prisma.voters.findUnique({
            where: {
                email: email
            }
        })
        if(!existingVoter){
            return res.status(409).json({message: `email is not exist`})
        }
        // compare password

        const isPasswordCorrect = await bcrypt.compare(password,existingVoter.password)
        if(!isPasswordCorrect){
            return res.status(404).json({message: 'password is incorrect'})
        }
        const token = jwt.sign(
            {id:existingVoter.id, name:existingVoter.name, email:existingVoter.email},
            SECRET_KEY,
            {expiresIn:'1h'}
        )
        return res.status(201).json({message: 'voter logged in success!',token})

    } catch (error) {
        res.status(500).json({message:"internal servarl error",error:error.message})
    }
});
router.put("/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const { name,email,password } = req.body
        const voter = await prisma.voters.update({
            data:{
                name,
                email,
                password
            },
            where: {
                id: Number(id)
            }
        });
        if(!voter){
            res.status(404).json({message:`Voter ${id} Not Found`})
        }
        return res.status(200).json({message: `voter updated success`,voter});
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error})
    }
});

router.delete("/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const voter = await prisma.voters.delete({
            where:{
                id: Number(id)
            }
        });
        if(!voter){
            res.status(404).json({message:`Voter ${id} Not Found`})
        }
        return res.status(200).json({message:`voter deleted success`,voter});
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error: error.message})
    }
});


export default router;
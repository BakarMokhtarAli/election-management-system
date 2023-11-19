import express from "express";

const router = express.Router();

import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY
import adminAuthenticate from "./middleware/adminAuthenticate.js";

router.post("/signup",async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const existingAdmin = await prisma.admin.findUnique({
            where:{
                email: email
            }
        })
        if(existingAdmin){
            return res.status(409).json({message: 'Admin already exist!'})
        }

        // hash the password

        const hashedPassword = await bcrypt.hash(password,10);

        const admin = await prisma.admin.create({
            data:{
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        if(!admin){
            return res.status(404).json({message: 'Admin not created!'})
        }
        return res.status(200).json({message: 'Admin created success!',admin})
    } catch (error) {
        return res.status(500).json({message: `internal server error`,error:error.message})
    }
});

router.post("/signin",async(req,res)=>{
    try {
        const { email, password } = req.body;
        const existingAdmin = await prisma.admin.findUnique({
            where:{
                email
            }
        })
        if(!existingAdmin){
            return res.status(404).json({message: "Email is not exist!"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingAdmin.password);
        if(!isPasswordCorrect){
            return res.status(404).json({message: 'password is incorrect!'})
        }
        const token = jwt.sign(
            {id: existingAdmin.id, name: existingAdmin.name, email: existingAdmin.email},
            SECRET_KEY,
            {expiresIn: '1h'}
        )
        return res.status(201).json({message: "admin logged in success!",token})
    } catch (error) {
        return res.status(500).json({message: `internal server error`,error:error.message})
    }
});

router.put("/:id",adminAuthenticate,async(req,res)=>{
    try {
        const { id } = req.params;
        const { name,email,password } = req.body
        const admin = await prisma.admin.update({
            data:{
                name,
                email,
                password
            },
            where: {
                id: Number(id)
            }
        });
        if(!admin){
            res.status(404).json({message:`amin ${id} Not Found`})
        }
        return res.status(200).json({message: `admin updated success`,admin});
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error})
    }
});

router.delete("/:id",adminAuthenticate,async(req,res)=>{
    
    try {
        const { id } = req.params;
        const admin = await prisma.admin.delete({
            where:{
                id: Number(id)
            }
        });
        if(!admin){
            res.status(404).json({message:`admin ${id} Not Found`})
        }
        return res.status(200).json({message:`admin deleted success`,admin});
    } catch (error) {
        res.status(500).json({message:"internal servarl error",error: error.message})
    }
});
export default router;
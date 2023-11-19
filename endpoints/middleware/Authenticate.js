import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

function Authenticate (req,res,next) {
    const token = req.headers.authorization
    if(!token){
        return res.status(404).json({message:'Authentication failed Missing token'})
    }
    // console.log("Token", token)
    const tokenWithOutBearer = token.split(" ")[1];

    jwt.verify(tokenWithOutBearer,SECRET_KEY,(error,decoded)=>{
        if(error){
            res.status(404).json({message:'Invalid token'})
        }
        req.decoded = decoded;
        next()
    })
}

export default Authenticate;
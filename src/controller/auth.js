import { usersValidator, signInValidator } from "../validations/users";
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()
const { SECRET_CODE } = process.env

export const signUp = async (req, res)=> {
    try {
   
        const { error } = usersValidator.validate(req.body,{abortEarly:false});


        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({message: errors})
        }

        const userExists = await User.findOne({email:req.body.email})
        if (userExists){
            // cách 1
            // throw 404
            // throw new Error ("User already exists")
            return res.status(400).json({
                message : 'Tai khoan nay da dang ky'
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
        // ...req.body,
        userName : req.body.userName,
        email : req.body.email,
        password : hashedPassword,
        role : req.body.role
    })

    user.password = undefined
    return res.status(200).json({
        message : 'Tao tai khoan thanh cong',
        user
    })

    } catch (error) {
        return res.status(500).json(
            {message: error.message});
    }
}



                // Sign in
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error } = signInValidator.validate(req.body,{abortEarly:false});


        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({message: errors})
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message:"Ban chua dang ky email nay"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                message:"Mat khau khong dung"
            })
        }
        // Tao jwt
        const accessToken = jwt.sign({_id: user._id},SECRET_CODE,{expiresIn: "1d"})

        // return results:
        user.password = undefined
        return res.status(200).json({
            message: "Dang nhap thanh cong",
            accessToken ,
            user 
        })

    } catch (error) {
        return res.status(500).json(
            {message: error.message});
    }
}


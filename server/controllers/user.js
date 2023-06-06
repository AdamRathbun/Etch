import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'




export const signin = async(req, res)=>{
    const {email, password} = req.body;

    dotenv.config()

    try {
        const alreadyUser=await User.findOne({email})

        if(!alreadyUser) return res.status(404).json({message:'Wrong user info.'})

        const isPasswordCorrect = await bcrypt.compare(password, alreadyUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid login.'})

        // note the secret is the second argument (currently 'Test'). it should be JWT_SECRET in .env file
        const token=jwt.sign({email :alreadyUser.email, id: alreadyUser._id}, process.env.JWT_SECRET, {expiresIn: '2h' })

        res.status(200).json({result: alreadyUser, token})
    } catch (error) {
        res.status(500).json({ message: 'Signin error.' })
    }
}

export const signup = async(req, res)=>{
    const { email, password, confirmPassword, firstName, lastName } = req.body

    dotenv.config()

    try {
        const alreadyUser=await User.findOne({email})

        if(alreadyUser) return res.status(400).json({message:'User exists already.'})

        if(password!==confirmPassword) return res.status(400).json({message:'The passwords are not matching.'})

        // second parameter is for the salt. 12 is a standard salt level.
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        // again, need to update 'Test' like above, with a JWT_SECRET in .env
        const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET, {expiresIn: '1h' })

        // not result:result
        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({ message: 'Signup error.' })
    }
}

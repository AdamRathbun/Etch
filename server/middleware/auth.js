import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const auth = async (req, res, next) => {
    dotenv.config()

    try {
        // grabbing token (JWT) from the frontend to check before an user likes, deletes, etc.
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

        let decodedData;

        if(token){
            // note the secret has to be the same one used when the token is created in ../controllers/user.js
            decodedData = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decodedData?.id
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth

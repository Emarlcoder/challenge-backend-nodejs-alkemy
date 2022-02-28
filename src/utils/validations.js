import pkg from 'jsonwebtoken';
const {verify} = pkg;
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = token => {
  try {
    const payload = verify(token, process.env.JWT_SECRET)
    return payload
  } catch (error) {
    return error.message
  }
}

export const watchman = (req,res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json({
      success: false,
      content: null,
      message: 'No token provided'
    })
  }
  const token = req.headers.authorization.split(' ')[1]
  const result = verifyToken(token)

  if(typeof result === 'object'){
    next()
  }else{
    return res.status(401).json({
      success: false,
      content: result,
      message: "Invalid token"
    })
  }
}
const { send } = require('express/lib/response')
const jwt = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('authToken')
    if(!token){
         return res.status(401).send({message:'Access denied. No token provided test 1 '})

    }
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next()

    }catch(err){{
        return res.status(401).send({message:'Access denied. No token provided'})

    }}
}

module.exports = auth
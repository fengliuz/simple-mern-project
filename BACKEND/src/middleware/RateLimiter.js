import rateLimit from "../config/upstash.js"

 const rateLimiter = async(req,res,next)=>{
    try{
        console.log(`request is ${req.method} with url ${req.url}`)
        const {success} = await rateLimit.limit("my-key-rate-limit")
        if(!success){
            return res.status(429).json({
                message:"Too many request attempts, try again later"
            })
        }
        next()
    }catch(error){
         res.status(500).json({
            message:"REDIS INTERNAL ERROR",
        })
        next(error)
    }
}
export default rateLimiter
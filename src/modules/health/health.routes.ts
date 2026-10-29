import { timeStamp } from "console"
import { Router } from "express"

const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.status(200).json({success:true, message:"Social media API is running", timeStamp:new Date().toISOString()})
})

export default healthRouter;
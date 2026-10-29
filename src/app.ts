import express from 'express'
import healthRouter from './modules/health/health.routes.js'

const app = express()

// Hide the Express technology header.
app.disable("x-powered-by")

// Parse incoming JSON request bodies.
app.use(express.json({ limit: "1mb" }))

//Register application routes.
app.use("/api/v1/health", healthRouter)

// Handle unknown routes.
app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message:"The requested route does not exist."
    }
  })
})


export default app;
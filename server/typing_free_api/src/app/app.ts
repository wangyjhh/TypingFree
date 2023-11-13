import express from "express"
import type { Express } from "express"
import { cors } from "../middleware/cors.middleware"
import helloRouter from "../router/typing.router"

const app: Express = express()

app.all("*", cors)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/api/v1", helloRouter)

export default app

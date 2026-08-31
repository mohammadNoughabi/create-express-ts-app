import express from "express"
import router from "./router.js"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", router)


export default app
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import appRouter from "../src/routes/app.router.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: "https://keyspeed.netlify.app",
    credentials: true,
}))

app.use(cookieParser())

mongoose.connect("mongodb+srv://bonfilnico:12345@pruebacoder.q69nl8a.mongodb.net/?retryWrites=true&w=majority", {dbName: "Mecanografia"})

app.use("/api", appRouter)

app.listen(8080, () => {
    console.log("Server up");
})
import { Router } from "express"
import testRouter from "./test.router.js"
import sessionRouter from "./session.router.js"
import userRouter from "./user.router.js"
import passportControl from "../middlewares/passport-control.middleware.js"

const router = Router()

router.use("/tests", passportControl("jwt"), testRouter)
router.use("/sessions", sessionRouter)
router.use("/users", passportControl("jwt"), userRouter)

export default router
import { Router } from "express"
import { hello } from "../controller/typing.controller"

const router: Router = Router()

router.get("/hello/:username", hello)

export default router

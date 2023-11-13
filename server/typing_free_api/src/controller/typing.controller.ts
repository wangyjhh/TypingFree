import type { Request, Response } from "express"
import { helloHandle } from "../service/typing.service"

export const hello = async (req: Request, res: Response) => {
	let { username } = req.params
	let msg = await helloHandle(username as string)
	res.send(msg)
}

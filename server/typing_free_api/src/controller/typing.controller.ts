import type { Request, Response } from "express"
import { getdefaultHandle } from "../service/default.service"
import { getcustomHandle } from "../service/custom.service"
import { pinyinHandle } from "../service/pinyin.service"

export const getdefault = async (req: Request, res: Response) => {
	let { id } = req.params
	let msg = await getdefaultHandle(id)
	res.send(msg)
}

export const getcustom = async (req: Request, res: Response) => {
	let { text } = req.body
	let msg = await getcustomHandle(text as string)
	res.send(msg)
}

export const pinyin = async (req: Request, res: Response) => {
	let { text } = req.body
	let msg = await pinyinHandle(text as string)
	res.send(msg)
}

import type { Request, Response } from 'express'
import { getcustomHandle } from '../service/custom.service'
import { getdefaultHandle } from '../service/default.service'
import { pinyinHandle } from '../service/pinyin.service'

export const getdefault = async (req: Request, res: Response) => {
    const { id } = req.params
    const msg = await getdefaultHandle(id)
    res.send(msg)
}

export const getcustom = async (req: Request, res: Response) => {
    const { text } = req.body
    const msg = await getcustomHandle(text as string)
    res.send(msg)
}

export const pinyin = async (req: Request, res: Response) => {
    const { text } = req.body
    const msg = await pinyinHandle(text as string)
    res.send(msg)
}

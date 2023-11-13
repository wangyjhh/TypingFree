import type { Request, Response, NextFunction } from "express"
export const cors = (req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE")
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization")
	res.setHeader("Content-Type", "application/json;charset=utf-8")
	next()
}

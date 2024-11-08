import { Router } from 'express'
import { getcustom, getdefault, pinyin } from '../controller/typing.controller'

const router: Router = Router()

router.get('/getdefault/:id', getdefault)
router.post('/getcustom', getcustom)
router.post('/getpinyin', pinyin)

export default router

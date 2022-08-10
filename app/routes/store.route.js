import { Router } from "express"
import authMdlw from '../midleware/auth.midleware.js'
import storeController from "../controllers/store.controller.js"
const router = Router()

router.use(authMdlw.verifyToken)
router.get('/search/', storeController.search)
router.delete('/:id', storeController.deleteLink)
router.put('/:id', storeController.edit)
router.get('/', storeController.getAll)
router.post('/', storeController.save)

export default router
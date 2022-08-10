import { Router } from "express"
import adminController from '../controllers/admin.controller.js'
import authMidleware from "../midleware/auth.midleware.js"

const router = Router()
router.use([authMidleware.verifyToken, authMidleware.isAdmin])
router.get('/users',  adminController.getAllUser)
router.delete('/users/:id', adminController.deleteUser)

export default router
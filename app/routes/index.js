
import authRouter from "./auth.route.js"
import storeRouter from './store.route.js'
import adminRouter from './admin.route.js'

const router = app => {
    app.use('/api/auth/', authRouter)
    app.use('/api/store/',storeRouter)
    app.use('/api/admin/', adminRouter)
}

export default router
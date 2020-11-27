import {Router} from 'express'
import projectRoutes from './modules/project/routes'

const routes = Router()
routes.use('/projects', projectRoutes);
export default routes
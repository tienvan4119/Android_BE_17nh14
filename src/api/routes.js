import {Router} from 'express'
import projectRoutes from './modules/project/routes'
import taskRoutes from './modules/task/routes'
const routes = Router()
routes.use('/projects', projectRoutes);
routes.use('/tasks', taskRoutes);
export default routes
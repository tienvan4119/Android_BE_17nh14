import { Router } from 'express'

import ProjectController from './controller'
const routes = Router()
const projectController = new ProjectController()

routes.post("/", projectController.addProject.bind(projectController))
routes.get("/", projectController.getAllProject.bind(projectController))
routes.get("/getProjectEmail", projectController.getAllProjectEachEmail.bind(projectController))
routes.get("/getProject/:id", projectController.getProject.bind(projectController))
routes.put("/updateProject/:id", projectController.updateProject.bind(projectController))
routes.delete("/deleteProject/:id", projectController.deleteProject.bind(projectController))
export default routes
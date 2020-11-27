import { Router } from 'express'

import ProjectController from './controller'
const routes = Router()
const projectController = new ProjectController()

// routes.get("/" , userController.authenticateToken , userController.getMany.bind(userController))
// routes.get("/:id", userController.getById.bind(userController))
// routes.post("/", userController.createOne.bind(userController))
// routes.put("/:id", userController.updateOne.bind(userController))
// routes.post("/register",userController.Register.bind(userController))
// routes.post("/login", userController.Login.bind(userController))

routes.post("/", projectController.addProject.bind(projectController))
routes.post("/getGroup", projectController.getAllProjectOfEmail.bind(projectController))
export default routes
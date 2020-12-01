import { Router } from 'express'

import TaskController from './controller'
const routes = Router()
const taskController = new TaskController()

routes.post("/", taskController.addTask.bind(taskController))
routes.get("/", taskController.getAllTask.bind(taskController))
routes.get("/getTasksEmail", taskController.getAllTaskEachMember.bind(taskController))
routes.get("/getTask/:id", taskController.getTask.bind(taskController))
routes.put("/updateTask/:id", taskController.updateTask.bind(taskController))
routes.delete("/deleteTask/:id", taskController.deleteTask.bind(taskController))
export default routes
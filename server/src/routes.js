import express from "express";
const router = express.Router();

import * as taskController from './controller/taskController.js';

router
    .get("/task", taskController.getAllTasks)
    .get("/task/:id", taskController.getTaskById)

    .post("/task", taskController.createTask)
    
    .delete("/task/:id", taskController.deleteTask)
    
    .put("/task/:id", taskController.updateTask)

export default router;
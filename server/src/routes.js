import express from "express";
const router = express.Router();

import * as taskController from './controller/taskController.js';
import * as authController from './controller/authController.js';
import * as authMiddleware from './middleware/authMiddleware.js';

router
    .get("/task", authMiddleware.authenticateToken, taskController.getAllTasks)
    .get("/task/:id", taskController.getTaskById)

    .post("/login", authController.loginUser)
    .post("/register", authController.registerUser)
    .post("/task", taskController.createTask)
    
    .delete("/task/:id", taskController.deleteTask)
    
    .put("/task/:id", taskController.updateTask)

export default router;
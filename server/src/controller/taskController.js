import * as taskBusiness from '../business/taskBusiness.js';

export const updateTask = async (req, res) => {
    try{
        const data = req.body;
        const { id } = req.params;

        const task = await taskBusiness.updateTask(id, data);
        return res.status(204).send();

    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await taskBusiness.deleteTask(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const user_id = req.user.id;
        const tasks = await taskBusiness.getAllTasks(user_id);
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await taskBusiness.getTaskById(id);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createTask = async (req, res) => {
    try {
        const taskData = req.body;
    
        const newTask = await taskBusiness.createTask(taskData);
        return res.status(201).send(newTask);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

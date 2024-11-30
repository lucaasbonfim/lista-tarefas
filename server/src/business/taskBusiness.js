import * as taskDatasource from '../datasource/taskDatasource.js';

export const updateTask = async (id, data) => {
    try{
        const taskExists = await taskDatasource.getTaskById(id);

        if (!taskExists) {
            throw new Error("Tarefa não encontrada!");
        }

        const { name } = data;

        if (name !== taskExists.name) {
            const taskForVerificationData = await taskDatasource.getTaskByName(name);
        
            if (taskForVerificationData && taskForVerificationData.id !== id) {
                throw new Error("Uma tarefa com o nome inserido já existe");
            }
        }
    
        const task = await taskDatasource.updateTask(id, data);
    
        return task;
    } catch (error) {
        throw error;
    }
}

export const deleteTask = async (id) => {
    try {
        const taskExists = await taskDatasource.getTaskById(id);

        if (!taskExists) {
            throw new Error("Tarefa não encontrada!");
        }

        const task = await taskDatasource.deleteTask(id);
        return task;
    } catch (error) {
        throw error; 
    }
};

export const getAllTasks = async (user_id) => {
    try {
        const tasks = await taskDatasource.getAllTasks(user_id);
        return tasks;
    } catch (error) {
        throw error;
    }
};

export const getTaskById = async (id) => {
    try {
        const task = await taskDatasource.getTaskById(id);

        if (!task) {
            throw new Error("Tarefa não encontrada!");
        }

        return task;
    } catch (error) {
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const { name, cost, deadline } = taskData;
        const taskNameExists = await taskDatasource.getTaskByName(name);
        
        if (taskNameExists) {
            throw new Error("Uma tarefa com esse nome já foi cadastrada!");
        }

        const newTask = await taskDatasource.createTask(name, cost, deadline);
        return newTask;
    } catch (error) {
        throw error;
    }
};


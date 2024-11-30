import knex from '../database/index.js'; 
import { v4 as uuidv4 } from 'uuid';

export const updateTask = async (id, data) => {
    try {
        const task = await knex("task").where({ id }).update(data);
        return task;
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const task = await knex("task").where({ id }).del();
        return task;
    } catch (error) {
        throw error;
    }
};

export const getAllTasks = async (id) => {
    try {
        const tasks = await knex("task").select("*").where({ user_id: id });
        return tasks;
    } catch (error) {
        throw error;
    }
};

export const getTaskById = async (id) => {
    try {
        const task = await knex("task").select("*").where({ id }).first();
        return task;
    } catch (error) {
        throw error;
    }
};

export const getTaskByName = async (name) => {
    try {
        const task = await knex("task").select("*").where({ name }).first();
        return task;
    } catch (error) {
        throw error;
    }
};

export const createTask = async (name, cost, deadline) => {
    try {
        const lastOrderTask = await knex("task")
            .orderBy("order", "desc")
            .first();
        
        const order = lastOrderTask ? lastOrderTask.order + 1 : 1;

        const [newTask] = await knex("task").insert({
            id: uuidv4(),
            name,
            cost,
            deadline,
            order
        }, ['id', 'name', 'cost', 'deadline', 'order']);

        return newTask;
    } catch (error) {
        throw error;
    }
};

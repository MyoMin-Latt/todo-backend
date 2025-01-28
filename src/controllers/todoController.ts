import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
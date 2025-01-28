import request from 'supertest';
import app from '../src/server';
import { Todo } from '../src/models/Todo';

describe('Todo API', () => {
    let todoId: string;

    // Test 1: Create a new todo
    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({ title: 'Test Todo' });

        expect(res.status).toBe(201);
        expect(res.body.title).toBe('Test Todo');
        expect(res.body.completed).toBe(false);

        // Save the todo ID for later tests
        todoId = res.body._id;
    });

    // Test 2: Get all todos
    it('should get all todos', async () => {
        const res = await request(app).get('/api/todos');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test 3: Update a todo
    it('should update a todo', async () => {
        const res = await request(app)
            .put(`/api/todos/${todoId}`)
            .send({ title: 'Updated Todo', completed: true });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Updated Todo');
        expect(res.body.completed).toBe(true);
    });

    // Test 4: Delete a todo
    it('should delete a todo', async () => {
        const res = await request(app).delete(`/api/todos/${todoId}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Todo deleted');

        // Verify the todo is deleted
        const deletedTodo = await Todo.findById(todoId);
        expect(deletedTodo).toBeNull();
    });
});
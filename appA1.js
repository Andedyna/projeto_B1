const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: 'Estudar Node.js', completed: false },
    { id: 2, title: 'Desenvolver API', completed: true },
];

app.get('/', (req, res) => {
    res.send('Bem vindo!');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
        task.title = req.body.title || task.title;
        task.completed = req.body.completed ?? task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
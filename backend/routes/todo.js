const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.use(express.json())
router.use(authenticate);

var todos = [
    {
        "title": "do web dev daily",
        "description": "Make sure to code daily",
        "id": 1
    },
    {
        "title": "do web dev daily",
        "description": "Make sure to code daily",
        "id": 2
    },
    {
        "title": "do web dev daily",
        "description": "Make sure to code daily",
        "id": 3
    },
    {
        "title": "do web dev daily",
        "description": "Make sure to code daily",
        "id": 4
    }
];

router.get('/todos', (req, res)=>{
    res.json(todos)
})

router.post('/todos/',(req, res)=>{
    var todo = req.body
    const id = todos.length+1
    todo = {...todo, id}
    if(!todo.status)
        todo.status = "not started"
    todos.push(todo)
    console.log(todo)
    res.status(200).json(todo)
})

router.get('/todos/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const todo = todos.find(t=>t.id===id)
    if(todo)
        res.status(200).json(todo)
    else
        res.status(401).send({error: "todo does not exists!"})
})

router.put('/todos/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const updatedTodo = req.body
    const todoIndex = todos.findIndex(t=> t.id===id)
    if(todoIndex>=0)
    {
        todos[todoIndex] = updatedTodo
        console.log(updatedTodo)
        res.status(200).json(updatedTodo)
    }
    else
        res.status(403).send({error: "Todo not found!"})
    
})

router.delete('/todos/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const todoIndex = todos.findIndex(t => t.id===id)
    if(todoIndex>=0)
    {
        const todo = todos[todoIndex]
        todos = todos.filter(t => t.id!==id)
        res.status(200).json(todo);
    }
    res.status(402).send({error: "Todo not found"})
})

module.exports = router
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const Todo = require('../models/todo')

router.use(express.json())
router.use(authenticate);


router.get('/todos', (req, res)=>{
    const user = req.user
    console.log(user);
    Todo.find({userId: user.id}).then(todos=>{
        console.log(todos)
        res.json(todos)
    }).catch(err=>{
        console.error(err)
        res.status(404).send({err: err})
    })
})

router.post('/todos/',(req, res)=>{
    var todo = req.body
    const user = req.user
    if(!todo.status)
        todo.status = "not started"
    const newTodo = new Todo({...todo, userId: user.id});

    newTodo.save().then(result=>{
        console.log('Saved the todo sucessfully: ', result)
        res.status(200).json(result)
    }).catch(err=>{
        res.status(404).send({err})
    })
    
})

router.get('/todos/:id', (req, res)=>{
    const id = req.params.id
    console.log("id: ", id)
    Todo.findById({_id: id}).then(todo=>{
        if(todo){
            console.log('found todo: ', todo)
            res.status(200).json(todo);
        }
        else{
            res.status(401).send({err: "todo not found"})
        }
    }).catch(err=>{
        res.status(401).send({err: "todo does not exists!"})
    })
})

router.put('/todos/:id', (req, res)=>{
    const id = req.params.id
    const updatedTodo = req.body

    Todo.findByIdAndUpdate({_id: id}, updatedTodo,{
        new: true
    }).then(todo=>{
        res.status(200).json(todo)
    }).catch(err=>{
        res.status(403).send({error: "Todo not found!"})
    })
})

router.delete('/todos/:id', (req, res)=>{
    const id = req.params.id
    Todo.deleteOne({_id:id}).then(result=>{
        if(result.acknowledged && result.deletedCount>0){
            console.log('deleted: ', result)
            res.status(200).send({message: "deleted the todo"})
        }else{
            res.status(404).send({err: "Unable to delete todo"})    
        }
    }).catch(err=>{
        res.status(404).send({err, message: "Unable to find todo"})
    })
})

module.exports = router
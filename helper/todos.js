const db = require('../models');

exports.getTodos = (req , res)=>{
    db.Todo.find({})
    .then((todos)=>{
        res.json(todos);
    }).catch((err)=>{
        res.json(err);
    })
};

exports.createTodo = (req , res)=>{
    db.Todo.create(req.body)
    .then((todo)=>{
        res.status(201).json(todo);
    }).catch((err)=>{
        res.json(err.errors.name.message);
    });
};

exports.getTodo = (req , res)=>{
    db.Todo.findById({_id:req.params.id})
    .then((todo)=>{
        res.json(todo);
    })
    .catch((err)=>{
        res.json(err.message);
    });
};

exports.updateTodo =  (req , res)=>{
    db.Todo.findOneAndUpdate({_id:req.params.id} , req.body , {new : true})
    .then((updatedTodo)=>{
        res.json(updatedTodo);
    }).catch((err)=>{
        res.json(err);
    })
};

exports.deleteTodo =  (req , res)=>{
    db.Todo.findByIdAndDelete({_id:req.params.id})
    .then((todo)=>{
        res.json(todo);
    })
    .catch((err)=>{
        res.json(err);
    })
};

module.exports = exports;
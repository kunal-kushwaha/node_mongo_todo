const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {

    Todo.find({}).then((results) => {
        let todos = results.filter((todo) => {
            return !todo.done;
        });

        let doneTodos = results.filter((todo) => {
            return todo.done;
        })

        res.render('index', {todos: todos, doneTodos: doneTodos});
    })
});

router.post('/todos', (req, res) => {
    let newTodo = new Todo({description : req.body.description});

    newTodo.save().then((result) => {
        console.log(result);
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
        res.redirect('/')
    })
});

router.post('/todos/:id/completed', (req, res) => {
    let todoID = req.params.id;
    // exec() is to execute the query
    Todo.findById(todoID).exec().then((result) => {
        result.done = !result.done;
        return result.save();
    }).then(() => {
        res.redirect('/');
    });
});

router.post('/todos/:id/delete', (req, res) => {
    Todo.collection.deleteOne({"done" : true});
    res.redirect('/');
});

router.get('/todos/reset', (req, res) => {
    Todo.collection.deleteMany({});
    res.redirect('/');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const helpers = require('../helper/todos');

router.route('/todos')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/todo/:id')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);


module.exports = router;
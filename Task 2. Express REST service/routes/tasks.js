const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {undef} = require('../modules/undef');
let Task = [];

router.get('/tasks', (req, res) => {
  let tasksByBoard = [];
  if(typeof req.query.boardId !== "undefined") {
    for(let i = 0; i < Task.length; i++) {
      if(Task[i].boardId === req.query.boardId) {
        tasksByBoard.push(Task[i]);
      }
    }
    console.log('All tasks by board id get');
    res.send(tasksByBoard);
  }
  else {
    console.log('All tasks data get');
    res.send(Task);
  }
});

router.get('/tasks/:id', (req, res) => {
  let taskById = {};
  for(let i = 0; i < Task.length; i++) {
    if(Task[i].id === req.params.id) {
      taskById = Task[i];
      console.log(`Task ${req.params.id} data get`);
      break;
    }
  }
  res.send(taskById);
});

router.post('/tasks', (req, res) => {
  let taskId = uuidv4();
  let taskTitle = typeof req.query.title !== "undefined" ? req.query.title : undef("Task title");
  let taskOrder = typeof req.query.order !== "undefined" ? req.query.orders : undef("Task order");
  let taskDescription = typeof req.query.description !== "undefined" ? req.query.description : undef("Task description");
  let taskUserId = typeof req.query.userId !== "undefined" ? req.query.userId : undef("User ID");
  let taskBoardId = typeof req.query.boardId !== "undefined" ? req.query.boardId : undef("Board ID");
  let taskColumnId = typeof req.query.columnId !== "undefined" ? req.query.columnId : undef("Column ID");
  let newTask = {
    id: taskId,
    title: taskTitle,
    order: taskOrder,
    description: taskDescription,
    userId: taskUserId,
    boardId: taskBoardId,
    columnId: taskColumnId
  }
  Task.push(newTask);
  console.log('Task was created');
  res.status(201).send(newTask);
});

router.put('/tasks/:id', (req, res) => {
  for(let i = 0; i < Task.length; i++) {
    if(Task[i].id === req.params.id) {
      Task[i].title = typeof req.query.title !== "undefined" ? req.query.title : Task[i].title;
      Task[i].order = typeof req.query.order !== "undefined" ? req.query.order : Task[i].order;
      Task[i].description = typeof req.query.description !== "undefined" ? req.query.description : Task[i].description;
      Task[i].userId = typeof req.query.userId !== "undefined" ? req.query.userId : Task[i].userId;
      Task[i].boardId = typeof req.query.boardId !== "undefined" ? req.query.boardId : Task[i].boardId;
      Task[i].columnId = typeof req.query.columnId !== "undefined" ? req.query.columnId : Task[i].columnId;
      console.log(`Task ${req.params.id} was changed`);
      res.send(Task[i]);
      return;
    }
  }
  res.sendStatus(204);
});

router.delete('/tasks/:id', (req, res) => {
  for(let i = 0; i < Task.length; i++) {
    if(Task[i].id === req.params.id) {
      Task.splice(i, 1);
      res.sendStatus(200);
    }
  }
  res.sendStatus(204);
});

module.exports = router;
module.exports.Task = Task;

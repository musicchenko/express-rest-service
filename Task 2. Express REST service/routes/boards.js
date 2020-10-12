const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {undef} = require('../modules/undef');
const {Task} = require('./tasks');
const {Column} = require('./columns');
let Board = [];

router.get('/boards', (req, res) => {
  res.send(Board);
});

router.get('/boards/:id', (req, res) => {
  let board = {};
  for(let i = 0; i < Board.length; i++) {
    if(Board[i].id === req.params.id) {
      board = Board[i];
      break;
    }
  }
  res.send(board);
});

router.post('/boards', (req, res) => {
  let boardId = uuidv4();
  let boardTitle = typeof req.query.title !== "undefined" ? req.query.title : undef("Board title");
  let boardColumns = [];
  if(typeof req.query.columns !== "undefined") {
    try {
      let columnsCount = parseInt(req.query.columns);
      let newColumn = [];
      for(let i = 0; i < columnsCount; i++) {
        Column.push(newColumn);
        boardColumns.push(newColumn);
      }
    }
    catch(error) {
      console.log(`Error: ${error}`);
    }
  }
  let newBoard = {
    id: boardId,
    title: boardTitle,
    columns: boardColumns
  };
  Board.push(newBoard);
  console.log('Board created');
  res.status(201).send(newBoard);
});

router.put('/boards/:id', (req, res) => {
  let board = {};
  for(let i = 0; i < Board.length; i++) {
    if(Board[i].id === req.params.id) {
      Board[i].title = typeof req.query.title !== "undefined" ? req.query.title : Board[i].title;
      if(typeof req.query.columns !== "undefined") {
        try {
          let columnsCount = parseInt(req.query.columns);
          let newColumn = [];
          for(let i = 0; i < columnsCount; i++) {
            Column.push(newColumn);
            boardColumns.push(newColumn);
          }
          Board[i].columns = boardColumns;
        }
        catch(error) {
          console.log(`Error: ${error}`);
        }
      }
      board = Board[i];
      console.log(`Board ${req.params.id} was changed`);
      break;
    }
  }
  res.send(board);
});

router.delete('/boards/:id', (req, res) => {
  for(let i = 0; i < Board.length; i++) {
    if(Board[i].id === req.params.id) {
      deleteTasksByBoardId(req.params.id);
      Board.splice(i, 1);
      console.log(`Board ${req.params.id} deleted`);
      break;
    }
  }
  res.sendStatus(200);
});

function deleteTasksByBoardId(boardId) {
  let i = Task.length-1;
  while(i >= 0) {
    if(Task[i].boardId === boardId) {
      Task.splice(i, 1);
    }
    i--;
  }
}

module.exports = router;
module.exports.Board = Board;

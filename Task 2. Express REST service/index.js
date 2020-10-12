const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');
const boardsRoutes = require('./routes/boards');
const tasksRoutes = require('./routes/tasks');
const port = 4000;

app.use(usersRoutes);
app.use(boardsRoutes);
app.use(tasksRoutes);

app.listen(port, () => {
  console.log('Server started');
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var logger = function(req, res, next) {
  console.log('LOGGER');
  next();
}

app.use(logger);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
// Parse text/plain
app.use(bodyParser.text());

app.use(function(req, res, next) {
  // Allow code from any origin to access a resource
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

let taskList = [
  {
    createAt: 1543740243000,
    id: "1543740243000",
    name: "我的模拟任务1",
  },
  {
    createAt: 1543740253000,
    id: "1543740253000",
    name: "我的模拟任务2",
  },
  {
    createAt: 1543658400000,
    id: "1543658400000",
    name: "我的模拟任务3",
  },
];

app.get('/task/taskList', function (req, res) {
  console.log(taskList);
  res.status(200).json({
    code: '0',
    data: taskList,
  });
});

app.get('/task/taskDetail', function(req, res) {
  const { id } = req.query;
  res.status(200).json({
    code: '0',
    data: taskList.find(task => task.id === id) || {},
  });
});

app.post('/task/createTask', function(req, res) {
  console.log(req.body);
  const { name } = req.body;
  if (name === void 0) {
    res.status(500).send('name为必填');
    return;
  }
  const id = Date.now().toString();
  taskList.push({
    createAt: +id,
    id,
    name,
  });
  console.log(taskList);
  res.status(200).json({
    code: '0',
    data: {
      createAt: +id,
      id,
    },
  });
});

app.delete('/task', function(req, res) {
  const { id } = req.body;
  const taskIndex = taskList.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    res.status(404).send();
    return;
  }

  taskList = [
    ...taskList.slice(0, taskIndex),
    ...taskList.slice(taskIndex + 1),
  ];
  console.log(taskList);
  res.status(200).json({
    code: '0',
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

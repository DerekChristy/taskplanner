const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', (req, res) => {
  res.send('From API');
});
router.get('/tasks', (req, res) => {
  Task.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(docs);
    }
  });
});
router.get('/delete/:id', (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});
router.get('/status/:id/:status', (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.params.status },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});
router.post('/task', (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    type: req.body.type,
    priority: req.body.priority,
  });
  task.save((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

router.post('/update', (req, res) => {
  const task = req.body;
  Task.findOneAndUpdate(
    { _id: task._id },
    {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      type: task.type,
      priority: task.priority,
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: 'updated' });
      }
    }
  );
});

module.exports = router;

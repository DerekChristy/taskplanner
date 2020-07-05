const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
  },
  priority: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
  },
});

module.exports = mongoose.model('task', taskSchema, 'tasks');

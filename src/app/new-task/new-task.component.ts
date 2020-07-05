import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { ITask } from '../models/ITask';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  tasks: ITask[] = [];
  minDate = moment(new Date()).format('YYYY-MM-DD');
  task = {
    _id: '',
    title: '',
    description: '',
    dueDate: '',
    type: 'task',
    priority: 'patch',
    status: 'open',
  };
  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask
  ) {}

  ngOnInit(): void {
    if (this.data !== null) {
      this.task._id = this.data._id;
      this.task.title = this.data.title;
      this.task.description = this.data.description;
      this.task.dueDate = moment(this.data.dueDate).format('YYYY-MM-DD');
      this.task.type = this.data.type;
      this.task.priority = this.data.priority;
    }
  }

  onTaskTypeChange(val) {
    this.task.type = val;
  }
  onTaskPriorityChange(val) {
    this.task.priority = val;
  }
}

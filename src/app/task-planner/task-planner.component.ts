import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-planner',
  templateUrl: './task-planner.component.html',
  styleUrls: ['./task-planner.component.css'],
})
export class TaskPlannerComponent implements OnInit {
  openTasks = [];
  progTasks = [];
  completedTasks = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.updateTaskList();
  }
  updateTaskList() {
    this.taskService.getTasks().subscribe((data) => {
      if (data) {
        data.forEach((task) => {
          switch (task.status) {
            case 'open':
              this.openTasks.push(task);
              break;
            case 'prog':
              this.progTasks.push(task);
              break;
            case 'completed':
              this.completedTasks.push(task);
              break;
            default:
              this.openTasks.push(task);
              break;
          }
        });
      }
    });
  }
  newTask() {
    this.taskService.openTaskDialog().subscribe((newTask) => {
      if (newTask) {
        this.openTasks.push(newTask);
        this.taskService.newTask(newTask).subscribe(
          (err) => {},
          (data) => {
            //    this.updateTaskList();
            console.log('saved task');
          }
        );
      }
    });
  }
  deleteTask(task) {
    this.taskService.openDeleteDialog(task).subscribe((confirm) => {
      if (confirm) {
        if (task.status === 'open') {
          this.openTasks.splice(this.openTasks.indexOf(task), 1);
        } else if (task.status === 'prog') {
          this.progTasks.splice(this.progTasks.indexOf(task), 1);
        } else {
          this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
        }

        this.taskService.deleteTask(task._id).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }

  updateTask(task) {
    this.taskService.openEditTaskDialog(task).subscribe((modTask) => {
      if (modTask) {
        console.log(modTask);
        this.openTasks.splice(this.openTasks.indexOf(task), 1, modTask);
        this.taskService.updateTask(modTask).subscribe(
          (err) => {},
          (data) => {
            console.log('saved task');
          }
        );
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (event.container.id === 'openList') {
        if (event.previousContainer.id === 'completedList') {
          this.completedTasks[event.previousIndex].status = 'open';
          this.taskService
            .updateStatus(this.completedTasks[event.previousIndex]._id, 'open')
            .subscribe((data) => {
              console.log(data);
            });
        } else {
          this.progTasks[event.previousIndex].status = 'open';
          this.taskService
            .updateStatus(this.progTasks[event.previousIndex]._id, 'open')
            .subscribe((data) => {
              console.log(data);
            });
        }
      } else if (event.container.id === 'inprogList') {
        if (event.previousContainer.id === 'completedList') {
          this.completedTasks[event.previousIndex].status = 'prog';
          this.taskService
            .updateStatus(this.completedTasks[event.previousIndex]._id, 'prog')
            .subscribe((data) => {
              console.log(data);
            });
        } else {
          this.openTasks[event.previousIndex].status = 'prog';
          this.taskService
            .updateStatus(this.openTasks[event.previousIndex]._id, 'prog')
            .subscribe((data) => {
              console.log(data);
            });
        }
      } else if (event.container.id === 'completedList') {
        if (event.previousContainer.id === 'openList') {
          this.openTasks[event.previousIndex].status = 'completed';
          this.taskService
            .updateStatus(this.openTasks[event.previousIndex]._id, 'completed')
            .subscribe((data) => {
              console.log(data);
            });
        } else {
          this.progTasks[event.previousIndex].status = 'completed';
          this.taskService
            .updateStatus(this.progTasks[event.previousIndex]._id, 'completed')
            .subscribe((data) => {
              console.log(data);
            });
        }
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.openTasks);
    console.log(this.progTasks);
    console.log(this.completedTasks);
  }
}

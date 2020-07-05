import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './models/ITask';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from './new-task/new-task.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private server = 'http://localhost:3000/api';
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  openTaskDialog(): Observable<any> {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      maxWidth: '90%',
      minWidth: '50%',
    });
    return dialogRef.afterClosed();
  }
  openEditTaskDialog(task): Observable<any> {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: task,
      maxWidth: '90%',
      minWidth: '50%',
    });
    return dialogRef.afterClosed();
  }
  openDeleteDialog(task): Observable<any> {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: task,
    });
    return dialogRef.afterClosed();
  }
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.server + '/tasks');
  }
  newTask(task) {
    return this.http.post<any>(this.server + '/task', task);
  }
  updateStatus(id, status) {
    return this.http.get(this.server + '/status/' + id + '/' + status);
  }
  updateTask(task) {
    return this.http.post<any>(this.server + '/update', task);
  }
  deleteTask(id) {
    return this.http.get(this.server + '/delete/' + id);
  }
}

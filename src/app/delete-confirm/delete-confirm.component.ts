import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../models/ITask';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css'],
})
export class DeleteConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public task: ITask) {}

  ngOnInit(): void {}
}

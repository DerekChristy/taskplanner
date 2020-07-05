import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialComponents = [
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonToggleModule,
  DragDropModule,
  MatToolbarModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}

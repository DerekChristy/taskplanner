import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskPlannerComponent } from './task-planner/task-planner.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { DaysLeftPipe } from './days-left.pipe';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskPlannerComponent,
    HomeComponent,
    NewTaskComponent,
    DeleteConfirmComponent,
    DaysLeftPipe,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [NewTaskComponent, DeleteConfirmComponent],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}

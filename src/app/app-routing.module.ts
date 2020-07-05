import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskPlannerComponent } from './task-planner/task-planner.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'task-planner', component: TaskPlannerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'stats', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

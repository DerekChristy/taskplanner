import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TaskService } from '../task.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  PieChart = [];
  BarChart = [];
  LineChart = [];
  tasksLeft = 0;
  openTasks = 0;
  progTasks = 0;
  completedTasks = 0;
  priorities = [0, 0, 0, 0, 0];
  dueDates = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      if (data) {
        data.forEach((task) => {
          if (task.status === 'open') {
            this.tasksLeft++;
            this.openTasks++;
            this.dueDates.push(moment(task.dueDate).format('YYYY-MM-DD'));
          } else if (task.status === 'prog') {
            this.tasksLeft++;
            this.progTasks++;
            this.dueDates.push(moment(task.dueDate).format('YYYY-MM-DD'));
          } else if (task.status === 'completed') {
            this.completedTasks++;
          }
          switch (task.priority) {
            case 'show-stopper':
              this.priorities[0]++;
              break;
            case 'critical':
              this.priorities[1]++;
              break;
            case 'major':
              this.priorities[2]++;
              break;
            case 'minor':
              this.priorities[3]++;
              break;
            case 'patch':
              this.priorities[4]++;
              break;
            default:
              break;
          }
        });
        let uniqueDates = [...new Set(this.dueDates)];
        console.log(uniqueDates);
        let lineData = [];
        uniqueDates.forEach((date) => {
          let count = 0;
          this.dueDates.forEach((d) => {
            if (date === d) {
              count++;
            }
          });
          let lineDateCount = {
            t: date,
            y: count,
          };
          lineData.push(lineDateCount);
        });

        this.PieChart = new Chart('pieChart', {
          type: 'doughnut',
          data: {
            labels: ['Open', 'In Progress', 'Completed'],
            datasets: [
              {
                data: [this.openTasks, this.progTasks, this.completedTasks],
                backgroundColor: ['#f00', '#0f0', '#00f'],
              },
            ],
          },
          options: {
            cutoutPercentage: 80,
            legend: {
              position: 'bottom',
            },
          },
        });

        this.BarChart = new Chart('barChart', {
          type: 'bar',
          data: {
            labels: ['Show Stoppper', 'Critical', 'Major', 'Minor', 'Patch'],
            datasets: [
              {
                barPercentage: 1,
                label: ['tasks'],
                backgroundColor: [
                  '#ff8c8c',
                  '#ffc98c',
                  '#d3ff8c',
                  '#a7ff8c',
                  '#8cbeff',
                ],
                data: this.priorities,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
        // TODO: Line chart
        this.LineChart = new Chart('lineChart', {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'ghg',
                fill: false,
                lineTension: 0,
                data: lineData,
              },
            ],
          },
          options: {
            scales: {
              xAxes: [
                {
                  type: 'time',
                  distribution: 'linear',
                  time: {
                    displayFormats: {
                      day: 'MMM DD',
                    },
                  },
                },
              ],
            },
          },
        });
      }
    });
  }
}

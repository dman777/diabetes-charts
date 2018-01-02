import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayChartComponent } from './today-chart/today-chart.component';

const routes: Routes = [
  { path: 'today', component: TodayChartComponent },
  { path: '', redirectTo: '/today', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }

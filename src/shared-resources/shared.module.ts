import { NgModule } from '@angular/core';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { PollResultComponent } from 'src/app/poll/poll-result/poll-result.component';

@NgModule({
    imports: [ChartsModule, WavesModule, MaterialModule, CommonModule],
    declarations: [BarChartComponent,PollResultComponent],
    exports: [BarChartComponent, ChartsModule, WavesModule, PollResultComponent],
})
export class SharedModule { }
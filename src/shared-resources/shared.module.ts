import { NgModule } from '@angular/core';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PollResultComponent } from './components/poll-result/poll-result.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ChartsModule, WavesModule, MaterialModule,CommonModule],
    declarations: [BarChartComponent, PollResultComponent],
    exports: [BarChartComponent, PollResultComponent, ChartsModule, WavesModule],
    entryComponents: [PollResultComponent]
})
export class SharedModule { }
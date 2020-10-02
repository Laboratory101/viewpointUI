import { NgModule } from '@angular/core';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ChartsModule, WavesModule, MaterialModule, CommonModule],
    declarations: [BarChartComponent],
    exports: [BarChartComponent, ChartsModule, WavesModule],
})
export class SharedModule { }
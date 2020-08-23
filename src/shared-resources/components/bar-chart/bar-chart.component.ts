import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import randomColor from 'randomcolor';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  chartType: string;
  chartLabels: Array<string>;
  chartDataSet: Array<any>;
  chartColors: Array<{ backgroundColor: Array<string>, borderColor: Array<string>, borderWidth: number }>;
  chartOptions: any;

  @Input() displayData: Array<{ label: string, value: number }>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartDataSet = [{ data: [] }];
    this.chartLabels = [];
    this.chartColors = [{ backgroundColor: [], borderColor: [], borderWidth: 2 }]
    if (changes.displayData && (this.displayData && this.displayData.length)) {
      this.displayData.forEach(chartData => {
        this.chartLabels.push(chartData.label);
        this.chartDataSet[0].data.push(chartData.value);
        const chartColor = this.generateRandomColor();
        this.chartColors[0].borderColor.push(chartColor.border);
        this.chartColors[0].backgroundColor.push(chartColor.background);
      })
    }
  }

  ngOnInit() {
    this.chartType = 'bar';
    this.chartOptions = { responsive: true };
  }

  chartClicked(e: any): void { }
  chartHovered(e: any): void { }


  private generateRandomColor(): { background: string, border: string } {
    const bgColor: string = randomColor({
      luminosity: 'bright',
      format: 'rgba',
      alpha: 0.2
    });
    const border: string = bgColor.replace('0.2', '1');
    return { background: bgColor, border }
  }

}

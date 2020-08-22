import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  chartType: string;
  chartLabels: Array<string>;
  chartDataSet: Array<any>;
  chartColors: Array<any>;
  chartOptions: any;

  // @Input() displayData: Array<{ label: string, value: number }>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.chartDataSet = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }];
    // this.chartLabels = []
    // if (changes.displayData && (this.displayData && this.displayData.length)) {
    //   this.displayData.forEach(chartData => {

    //   })
    // }
  }

  ngOnInit() {
    this.chartType = 'bar';
    this.chartOptions = { responsive: true };
    this.chartDataSet = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }];
    this.chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    this.chartColors = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];
  }

  chartClicked(e: any): void { }
  chartHovered(e: any): void { }

}

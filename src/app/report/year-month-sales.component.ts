import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportService } from './report.service';
import { YearMonthSales } from './year-month-sales';

@Component({
  selector: 'app-year-month-sales',
  templateUrl: './year-month-sales.component.html',
  styleUrls: ['./year-month-sales.component.css']
})
export class YearMonthSalesComponent implements OnInit {

  data: YearMonthSales[] = [];
  label = 'Sales';
  isLoadingResults = true;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  constructor(public reportService: ReportService) { }

  ngOnInit(): void {
    this.getSalesByMonth();
  }

  getSalesByMonth() {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
    this.reportService.getSalesByMonth().subscribe((data: YearMonthSales[]) => {
      this.data = data;
      const chartdata: number[] = [];
      const chartcolor: string[] = [];
      this.data.forEach((element: YearMonthSales) => {
        this.barChartLabels.push(element.year + "-" + element.month);
        chartdata.push(element.sales);
        chartcolor.push('rgba(255, 165, 0, 0.5)');
      });
      this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}

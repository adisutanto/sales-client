import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { YearMonthSales } from './year-month-sales';

@Component({
  selector: 'app-year-month-sales',
  templateUrl: './year-month-sales.component.html',
  styleUrls: ['./year-month-sales.component.css']
})
export class YearMonthSalesComponent implements OnInit {

  data: YearMonthSales[] = [];

  constructor(public reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getSalesByMonth().subscribe((data: YearMonthSales[]) => {
      this.data = data;
    });
  }

}

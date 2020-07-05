import { Component, OnInit } from '@angular/core';
import { ProductSales } from './product-sales';
import { ReportService } from './report.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css']
})
export class TopSellingProductsComponent implements OnInit {

  data: ProductSales[] = [];

  constructor(public reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getTopSellingProducts().subscribe((data: ProductSales[]) => {
      this.data = data;
    });
  }

}

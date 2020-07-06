import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductSales } from './product-sales';
import { ReportService } from './report.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css']
})
export class TopSellingProductsComponent implements OnInit {

  countries: string[] = [];
  countryForm: FormGroup;
  data: ProductSales[] = [];

  constructor(private fb: FormBuilder, public reportService: ReportService) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      country: [null]
    });
    this.countryForm.get('country').valueChanges.subscribe(value => this.onCountryChanged(value));
    this.reportService.getCountries().subscribe((data: string[]) => {
      this.countries = data;
    });
    this.reportService.getTopSellingProducts(null).subscribe((data: ProductSales[]) => {
      this.data = data;
    });
  }

  onCountryChanged(value: string) {
    this.reportService.getTopSellingProducts(value).subscribe((data: ProductSales[]) => {
      this.data = data;
    });
  }

}

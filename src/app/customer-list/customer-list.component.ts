import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
    })
  }

  removeCustomer(customer, index) {
    if (window.confirm('Are you sure?')) {
      this.customerService.delete(customer.id).subscribe((data) => {
        this.customers.splice(index, 1);
      })
    }
  }
}

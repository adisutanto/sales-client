import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  submitted = false;
  customerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [''],
      lastName: ['', [Validators.required]],
      city: [''],
      country: [''],
      phone: ['', [Validators.pattern('^[0-9-]+$')]]
    });
  }

  get myForm() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.customerForm.valid) {
      return false;
    } else {
      this.customerService.create(this.customerForm.value).subscribe(res => {
        console.log('Customer created!');
        this.router.navigateByUrl('/customers');
      }, (error) => {
        console.log(error);
      });
    }
  }

}

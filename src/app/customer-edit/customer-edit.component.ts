import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  submitted = false;
  editForm: FormGroup;
  customerData: Customer[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCustomer(id);
    this.updateCustomer();
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getCustomer(id) {
    this.customerService.getById(id).subscribe(data => {
      this.editForm.setValue({
        firstName: data['firstName'],
        lastName: data['lastName'],
        city: data['city'],
        country: data['country'],
        phone: data['phone'],
      });
    });
  }

  updateCustomer() {
    this.editForm = this.fb.group({
      firstName: [''],
      lastName: ['', [Validators.required]],
      city: [''],
      country: [''],
      phone: ['', [Validators.pattern('^[0-9-]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.customerService.update(id, this.editForm.value)
        .subscribe(res => {
          this.router.navigateByUrl('/customers');
          console.log('Content updated successfully!')
        }, (error) => {
          console.log(error)
        })
    }
  }

}

import { Component } from '@angular/core';
import { BackendApiService } from '../Services/backend-api.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private service: BackendApiService, private fb: FormBuilder) { }
  ngOnInit() { this.getOrganizationOptions() }
  newUser = this.fb.group({
    organizationId: [null, Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    phoneNumber: ["", Validators.required],
    email: ["", Validators.required],
    doB: [new Date(), Validators.required],
    address: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", [Validators.required, this.checkPasswordValidator()]]
  })
  
  newOrganization = this.fb.group({
    name: ["", Validators.required],
    type: ["", Validators.required],
    contactNumber: ["", Validators.required],
    email: ["", Validators.required],
    address: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", [Validators.required, this.checkPasswordValidator()]]
  })
  oldOrganizationsList: any
  getOrganizationOptions() { this.service.getOrganizations().subscribe(res => this.oldOrganizationsList = res) }
  confirmPassword: any
  checkPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      {
        const password = control.value
        if (password !== this.confirmPassword) {return { "checkPassword": true }}
         return null 
      }
    }
  }
  createNewUser() {
    if (this.newUser.valid) {
      const tenantId: any = this.newUser.value.organizationId
      localStorage.setItem("tenant", tenantId), 
      this.service.createUser(this.newUser.value).subscribe(),
      this.newUser.reset() }
  }
  createNewOrg() {
    if (this.newOrganization.valid) {
      this.service.createOrg(this.newOrganization.value).subscribe()
      this.newOrganization.reset() }
  }
}

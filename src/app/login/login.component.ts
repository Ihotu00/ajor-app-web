import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendApiService } from '../Services/backend-api.service';
import { AuthenticatedResponse } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ProxyService } from '../Services/proxy.service';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  organizations: any
  tenantId!: any
  constructor(
    private fb: FormBuilder, 
    private service: BackendApiService, 
    private proxy: ProxyService,
    private router: Router,
    // private httpError: HttpErrorResponse
    ) { }
  submitLogin() {
    this.service.usersLogin(this.login.value).subscribe(
      {
        next: (response: AuthenticatedResponse) => {
          const token = response.token
          localStorage.setItem("jwt", token)
          localStorage.setItem("tenant", this.proxy.decodeUserTenant())
          this.router.navigate(["/profile"])
        },
        error: (err: HttpErrorResponse) => {alert(err.statusText), console.log(err.error)}
      }
    )
  }
  loginAsAdmin() {
    this.service.adminLogin(this.login.value).subscribe(
      {
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token)
          localStorage.setItem("tenant", this.proxy.decodeUserId())
          this.router.navigate(["/admin"])
        },
        error: (err: HttpErrorResponse) => {alert(err.statusText), console.log(err.error)}
      }
    )
  }
}

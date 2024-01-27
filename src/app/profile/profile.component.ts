import { Component } from '@angular/core';
import { BackendApiService } from '../Services/backend-api.service';
import { User } from '../interfaces';
import { Router } from '@angular/router';
import { ProxyService } from '../Services/proxy.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isCollapsed = false
  constructor(
    private service: BackendApiService,
    private router: Router,
    private proxy: ProxyService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }
  ngOnInit() { this.currentUser() }
  user: User = new User
  edits: any
  currentUser() {
    const id = this.proxy.decodeUserId() //this.decodeToken()
    this.service.userById(id).subscribe(res => {
      this.user = res,
        this.getUsersContributions()
      this.edits = this.fb.group({
        // id: [this.user.id, Validators.required],
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        phoneNumber: [this.user.phoneNumber, Validators.required],
        email: [this.user.email, Validators.required],
        doB: [this.user.doB, Validators.required],
        address: [this.user.address, Validators.required]
      })
    })
  }
  contributions: any
  getUsersContributions() {
    this.service.userContributions(this.user.id)
      .subscribe(res => this.contributions = res)
  }
  logout() {
    localStorage.removeItem("jwt")
    localStorage.removeItem("tenant")
    this.router.navigate(['/login'])
  }
  userEdit() { this.service.editUser(this.user.id, this.edits.value)
    .subscribe(next => {this.currentUser()}) }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
}


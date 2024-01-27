import { Component } from '@angular/core';
import { BackendApiService } from '../Services/backend-api.service';
import { ProxyService } from '../Services/proxy.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isCollapsed = false
  constructor(private service: BackendApiService, private proxy: ProxyService, private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder) { }
    open(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })}
  ngOnInit() { this.getUsers(), this.getContributions() }
  allUsers: any
  getUsers() {
    this.service.getUsers().subscribe(res => this.allUsers = res) }
  allContributions: any
  getContributions() { this.service.getContributions().subscribe(res => this.allContributions = res) }
  contributionUsers: any
  getContributors(id: any) { this.service.contributionUsers(id).subscribe(res => this.contributionUsers = res)}
  newContribution = this.fb.group({
    Name: ['', Validators.required],
    AmountPerContributor: ['', Validators.required],
    MaxContributors: ['', Validators.required],
    OrganizationId: localStorage.getItem("tenant")
  })
  addNewContribution() { this.service.addContribution(this.newContribution.value)
    .subscribe( next => {this.getContributions()})  }
  contributor = { usersId: 0, contributionId: 0}
  addNewContributor() { 
    this.contributor.usersId = Number(this.contributor.usersId)
    this.service.addContributor(this.contributor)
        .subscribe(next => {this.getContributors(this.contributor.contributionId)})}
  logout() {
    localStorage.removeItem("jwt")
    localStorage.removeItem("tenant")
    this.router.navigate(['/login'])
  } 
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatedResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  orgUrl = "http://localhost:5282/api/Organization"
  usersUrl = "http://localhost:5282/api/Users"
  contributionUrl = "http://localhost:5282/api/Contribution"

  getOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(this.orgUrl)
  }
  getContributions(): Observable<any[]> {
    return this.http.get<any[]>(this.contributionUrl)
  }
  getUsers():Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl)
  }
  usersLogin(login: any): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(this.usersUrl + "/login", login
    )
  }
  userById(id: any): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/" + id)
  }
  userContributions(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + "/Contributions?id=" + id)
  }
  contributionUsers(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.contributionUrl + "/Contributors?id=" + id)
  }
  adminLogin(login: any): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(this.orgUrl + "/login", login
    )
  }
  addContribution(contribution: any): Observable<any[]> {
    return this.http.post<any[]>(this.contributionUrl, contribution
    )
  }
  addContributor(contributor: any): Observable<any[]> {
    return this.http.post<any[]>(this.contributionUrl + "/Contributor", contributor
    )
  }
  editUser(id: any, user: any): Observable<any[]> {
    return this.http.put<any[]>(this.usersUrl + "/" + id, user
    )
  }
  createUser(user: any): Observable<any[]> {
    return this.http.post<any[]>(this.usersUrl, user
    )
  }
  createOrg(user: any): Observable<any[]> {
    return this.http.post<any[]>(this.orgUrl, user
    )
  }
}

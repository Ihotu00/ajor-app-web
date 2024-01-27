import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private jwtHelper: JwtHelperService) { }
  tenantId!: any
  getTenant(id: number) {
    this.tenantId = id
  }
  setTenant() {
    return this.tenantId
  }
  decodeUserId() {
    const jwt = localStorage.getItem("jwt")
    if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
      const token = this.jwtHelper.decodeToken(jwt)
      return token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    }
  }
  decodeUserTenant() {
    const jwt = localStorage.getItem("jwt")
    if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
      const token = this.jwtHelper.decodeToken(jwt)
      return token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]
    }
  }
}

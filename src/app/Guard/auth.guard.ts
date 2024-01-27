import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot  } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (
route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const jwtHelper = inject(JwtHelperService)
  const token = localStorage.getItem("jwt");
  if (token && !jwtHelper.isTokenExpired(token)){
    return true;
  }
  router.navigate(["/login"]);
  return false;
};

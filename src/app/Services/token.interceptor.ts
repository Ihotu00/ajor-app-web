import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProxyService } from './proxy.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private service: ProxyService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tenantId = localStorage.getItem("tenant") //this.service.setTenant()
    if (tenantId != null) {
      const req = request.clone({
        headers: request.headers.set('tenant', tenantId)
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}

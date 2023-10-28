import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {AuthService} from "../../../services/data-access/account/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private authService = inject(AuthService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const userData = this.authService.getJwtData();
    if (userData && userData.authToken) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.authToken}`
        }
      });
      return next.handle(tokenizedReq);
    }

    return next.handle(req);

  }
}

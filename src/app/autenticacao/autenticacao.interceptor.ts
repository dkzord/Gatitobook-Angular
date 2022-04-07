import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokeService } from './toke.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokeService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.tokenService.possuiToken()){
      const token = this.tokenService.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}

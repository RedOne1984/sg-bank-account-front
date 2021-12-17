import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  // @ts-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(sessionStorage.getItem('user'));
    let request = req;
    if (user && user.token) {
      request = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + user.token) });
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            sessionStorage.clear();
            this.router.navigate(['login']);
          }
        }
        return throwError(error);
      })
    );
  }
}

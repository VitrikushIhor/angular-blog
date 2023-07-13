import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {AuthService} from '../admin/shared/services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.token;
      if (token !== null) {
        const updatedParams = req.params.set('auth', token);
        req = req.clone({params: updatedParams});
      }
    }
    return next.handle(req).pipe(
      tap(() => {
        console.log('interceptor')
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('interseptor erorr', error)
        if (error.status === 401) {
          this.authService.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFiled: true,
            },
          })
        }
        return throwError(error);
      }),
    );
  }

}

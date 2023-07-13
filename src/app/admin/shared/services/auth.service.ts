import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interfaces';
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {environment} from '../../../../envronments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDateValue = localStorage.getItem('fb-token-exp');
    const expDate = expDateValue ? new Date(expDateValue) : null;

    if (expDate && new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token') || null;
  }


  login(user: User): Observable<any> {
    const payload = {
      ...user,
      returnSecureToken: true,
    };

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, payload)
      .pipe(
        // @ts-ignore
        tap(this.setToken),
        catchError(this.handleError.bind(this)),
      );
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('email does not  exist')
        break
    }
    return throwError(error)
  }

  private setToken(res: FbAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res?.expiresIn * 1000);
      localStorage.setItem('fb-token', res?.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

}

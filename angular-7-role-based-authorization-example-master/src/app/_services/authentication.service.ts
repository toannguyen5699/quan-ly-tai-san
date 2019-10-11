import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

export interface TokenPayload {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role: string
  }

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public register(user: TokenPayload): Observable<any> {
        return this.http.post(`${config.apiUrl}/users`, user)
      }
}





// import { Observable, of } from 'rxjs'
// import { map } from 'rxjs/operators'
// import { Router } from '@angular/router'

// export interface UserDetails {
//   id: number
//   first_name: string
//   last_name: string
//   email: string
//   password: string
//   exp: number
//   iat: number
// }

// interface TokenResponse {
//   token: string
// }

// export interface TokenPayload {
//   id: number
//   first_name: string
//   last_name: string
//   email: string
//   password: string
// }

// @Injectable()
// export class AuthenticationService {
//   private token: string

//   constructor(private http: HttpClient, private router: Router) {}

//   private saveToken(token: string): void {
//     localStorage.setItem('usertoken', token)
//     this.token = token
//   }

//   private getToken(): string {
//     if (!this.token) {
//       this.token = localStorage.getItem('usertoken')
//     }
//     return this.token
//   }

//   public getUserDetails(): UserDetails {
//     const token = this.getToken()
//     let payload
//     if (token) {
//       payload = token.split('.')[1]
//       payload = window.atob(payload)
//       return JSON.parse(payload)
//     } else {
//       return null
//     }
//   }

//   public isLoggedIn(): boolean {
//     const user = this.getUserDetails()
//     if (user) {
//       return user.exp > Date.now() / 1000
//     } else {
//       return false
//     }
//   }

//   public register(user: TokenPayload): Observable<any> {
//     return this.http.post(`/users/register`, user)
//   }

//   public login(user: TokenPayload): Observable<any> {
//     const base = this.http.post(`/users/login`, user)

//     const request = base.pipe(
//       map((data: TokenResponse) => {
//         if (data.token) {
//           this.saveToken(data.token)
//         }
//         return data
//       })
//     )

//     return request
//   }

//   public profile(): Observable<any> {
//     return this.http.get(`/users/profile`, {
//       headers: { Authorization: ` ${this.getToken()}` }
//     })
//   }

//   public logout(): void {
//     this.token = ''
//     window.localStorage.removeItem('usertoken')
//     this.router.navigateByUrl('/')
//   }
// }
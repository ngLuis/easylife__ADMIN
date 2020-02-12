import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInterface } from '../interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASEURL = 'http://localhost:8000/api/';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logIn(user: UserInterface) {
    return this.http.post<UserInterface>(this.BASEURL+'auth/login', user);
  }

  me(token: string) {
    const params = new HttpParams().set('token', token);
    return this.http.post<UserInterface>(this.BASEURL+'auth/me', params);
  }
}

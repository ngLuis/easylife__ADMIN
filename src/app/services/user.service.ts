import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASEURL = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<UserInterface>(this.BASEURL+'userpanel');
  }

  getUserById(id) {
    return this.http.get<UserInterface>(this.BASEURL+'userpanel/'+id);
  }

  postUser(data) {
    return this.http.post<UserInterface>(this.BASEURL+'auth/register', data)
  }
  

  patchUser(id, data) {
    return this.http.post<UserInterface>(this.BASEURL+'userpanel/'+id, data);
  }

  deleteUser(id) {
    return this.http.delete<UserInterface>(this.BASEURL+'userpanel/'+id);
  }

  getComprasById(id) {
    return this.http.get<any>(this.BASEURL+'user/'+id+'/carrito/estado/1/');
  }

}

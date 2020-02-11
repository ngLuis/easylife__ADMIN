import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceInterface } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private BASEURL = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  getServices() {
    return this.http.get<ServiceInterface>(this.BASEURL+'servicio');
  }

  getServiceById(id) {
    return this.http.get<ServiceInterface>(this.BASEURL+'servicio/'+id);
  }

  deleteService(id) {
    return this.http.delete<ServiceInterface>(this.BASEURL+'servicio/'+id);
  }

  postService(service) {
    return this.http.post<ServiceInterface>(this.BASEURL+'servicio/', service);
  }

  patchService(service) {
    return this.http.post<ServiceInterface>(this.BASEURL+'servicio/'+service.get('id'), service);
  }
}

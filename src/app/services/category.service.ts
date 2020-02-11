import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryInterface } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BASEURL = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<any>(this.BASEURL+'categoria');
  }

  getCategoryById(id) {
    return this.http.get<CategoryInterface>(this.BASEURL+'categoria/'+id);
  }

  deleteCategory(id) {
    return this.http.delete<any>(this.BASEURL+'categoria/'+id);
  }

  postCategory(category) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    
    return this.http.post<any>(this.BASEURL+'categoria/', category, {headers: headers});
  }

  patchCategory(category) {
    return this.http.post<any>(this.BASEURL+'categoria/'+category.get('id'), category);
  }
}

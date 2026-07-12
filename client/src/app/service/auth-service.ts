import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl="http:localhost:5001/api";

  constructor(private http:HttpClient){

  }

  register(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, user);
  }

}

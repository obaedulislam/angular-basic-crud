import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  AddUser(User: any): Observable<any> {
    debugger;
    return this.http.post(this.url + "Users", User);
  }
}

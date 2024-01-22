import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  AddUser(User: any, type: any): Observable<any> {
    if (type == "add") {
      return this.http.post(this.url + "Users", User);
    } else {
      return this.http.put(this.url + "Users/" + User.id, User);
    }
  }
  GetAllUsers(): Observable<any> {
    return this.http.get(this.url + "Users");
  }
  DeleteUserById(id: any): Observable<any> {
    return this.http.delete(this.url + "Users/" + id);
  }
  GetUserById(id: any): Observable<any> {
    return this.http.get(this.url + "Users/" + id);
  }
}

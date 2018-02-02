import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ServerService {

  constructor(private http: Http) { }
  loginState;

  register(data){
    return this.http.post('/register',{data}).map(res => res.json());
  }

  userLogin(data){
    return this.http.post('/login',{data}).map(res => res.json())
  }

  isLoged(){
    return this.loginState;
  }

  createProject(data){
      return this.http.post('/startProject',{data}).map(res => res.json())
  }

}

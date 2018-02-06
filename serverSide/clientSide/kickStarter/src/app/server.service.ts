import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';



@Injectable()
export class ServerService {
  loginState = false;
  userName;
  userSub:Subject<string> = new Subject();

  constructor(private http: Http) {
    this.changeUserName();
    }

  changeUserName(){
    if(!this.loginState) return setTimeout(this.changeUserName.bind(this),500);
    return this.userSub.next(this.userName);
  }

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

  getAllProject(id){
    return this.http.get('/viewAll/' +id).map(res => res.json());
  }

  homePreview(id){
        return this.http.get('/preview/' +id).map(res => res.json());
  }

  viewProject(id){
    return this.http.get('/viewProject/' +id).map(res => res.json());
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';



@Injectable()
export class ServerService {
  loginState = false;
  userName;
  userId;
  userSub:Subject<string> = new Subject();

  constructor(private http: Http) {
    this.changeUserName();
    }

  changeUserName(){
    if(!this.loginState) return setTimeout(this.changeUserName.bind(this),500);
    return this.userSub.next(this.userName);
  }

  register(data){
    return this.http.post('/api/user/register',{data}).map(res => res.json());
  }

  userLogin(data){
    return this.http.post('/api/user/login',{data}).map(res => res.json())
  }

  isLoged(){
    return this.loginState;
  }

  createProject(data){
      return this.http.post('/api/user/startProject',{data}).map(res => res.json())
  }

  getAllProject(id){
    return this.http.get('/api/general/viewAll/' +id).map(res => res.json());
  }

  homePreview(id){
        return this.http.get('/api/general/preview/' +id).map(res => res.json());
  }

  viewProject(id){
    return this.http.get('/api/general/viewProject/' +id).map(res => res.json());
  }

  getUserProjects(){
    return this.http.get('/api/user/userArea').map(res => res.json());
  }

  deleteProject(id){
    return this.http.delete('/api/user/deletProject/'+id).map(res => res.json());
  }
}

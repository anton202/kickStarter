import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerService {

  constructor(private http: Http) { }


  register(data){
    return this.http.post('/register',{data}).map((res)=>res.json());
  }

}

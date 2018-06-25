import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StatsService {


  constructor(private http: Http) { }

  getStats(){
    return this.http.get('http://46.101.194.54:8082/api/general/stats').map(res => res.json());
  }

  contribution(data,id){
    return this.http.put('http://46.101.194.54:8082/api/user/contribute',{data,id}).map(res => res.json());
  }
}

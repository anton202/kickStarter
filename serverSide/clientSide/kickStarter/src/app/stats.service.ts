import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StatsService {


  constructor(private http: Http) { }

  getStats(){
    return this.http.get('/api').map(res => res.json());
  }

  contribution(data,id){
    return this.http.put('/api/contribute',{data,id}).map(res => res.json());
  }
}

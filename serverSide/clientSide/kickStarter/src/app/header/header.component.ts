import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { ServerService} from '../server.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[StatsService]
})
export class HeaderComponent implements OnInit {

date = new Date().toLocaleDateString();
userName = 'User';
signInOut:string = 'Sign In'
signOutStatus;
allStats = {};

  constructor(private stats: StatsService, private server:ServerService) {
    stats.getStats().subscribe(data=>this.allStats = data)
  }

  signOut(){
    if(this.signOutStatus){
    this.server.logOut().subscribe(()=>{});
    this.server.userSub.next('User');
    this.server.signOut.next(false);
  }
  }

  ngOnInit() {
    this.server.userSub.subscribe(d=>this.userName = d);
    this.server.isLoged().subscribe(res=>{
      if(res.status){
      this.server.userSub.next(res.session.name);
      this.server.signOut.next(true);
    }
    })
    this.server.signOut.subscribe(d=>{
      if(d){
      this.signInOut = 'Sign Out';
      this.signOutStatus = d;
    }else this.signInOut = 'Sign In';
    });
  }

}

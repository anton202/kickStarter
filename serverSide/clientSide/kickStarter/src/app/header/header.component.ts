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
allStats = {};

  constructor(private stats: StatsService, private server:ServerService) {
    stats.getStats().subscribe(data=>{this.allStats = data;console.log(this.allStats)})
  }


  ngOnInit() {
    this.server.userSub.subscribe(d=>this.userName = d);
  }

}

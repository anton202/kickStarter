import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[StatsService]
})
export class HeaderComponent implements OnInit {

date = new Date().toLocaleDateString();
monyContributed = '340,000$';
userName = 'User';
allStats;

  constructor(private stats: StatsService) {
    stats.getStats().subscribe(data=>{this.allStats = data;console.log(this.allStats)})

  }



  ngOnInit() {
  }

}

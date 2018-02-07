import { Component, OnInit,Input } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute,Router } from '@angular/router';
import { StatsService } from '../stats.service';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
  providers: [StatsService]
})
export class ViewProjectComponent implements OnInit {
  projectData;
  id;
  daysLeft:number;
  daysPast:number;
  isLoged;
  contributionStatus

  constructor(private server: ServerService, private route: ActivatedRoute, private stats:StatsService, private router: Router) {
    this.isLoged = this.server.loginState;
    route.params.subscribe(params => {
       this.id = params['id'];
    });
    this.getData();

   }

    contribute(val){
     if(!this.isLoged) return this.router.navigate(['/sign-in']);
     this.stats.contribution(val,this.id).subscribe((d)=>{
       this.contributionStatus = d;
       this.getData();
     });
   }

   getData(){
    this.server.viewProject(this.id).subscribe(data=>{this.projectData = data;
           let date2:any = new Date(data[0].createdAt);
           let date:any = new Date();
           this.daysPast = Math.round((date-date2)/86400000);
           this.daysLeft = data[0].fundingDurataion - this.daysPast;
         });
   }

  ngOnInit() {
  }

}

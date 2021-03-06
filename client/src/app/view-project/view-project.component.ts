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
  projectData = {};
  id;
  daysLeft:number;
  daysPast:number;
  contributionStatus;
  contributedMoney;
  backers;

  constructor(private server: ServerService, private route: ActivatedRoute, private stats:StatsService, private router: Router) {
    route.params.subscribe(params => {
       this.id = params['id'];
    });
    this.getData();

   }

    contribute(val) {
      if (this.daysLeft <= 0){
        return this.contributionStatus = 'This project has expired';
      }
     this.server.isLoged().subscribe(res=>{
     if(!res.status){
     return this.router.navigate(['/sign-in']);
     }
   });
     this.stats.contribution(val,this.id).subscribe(() => {
       this.contributionStatus = 'Thank you.';
       this.getData();
     } ,() => this.contributionStatus = 'oops something went wrong');
   }

   getData() {
    this.server.viewProject(this.id).subscribe(data => {this.projectData = data;
           this.contributedMoney = data.contributedMoney;
           this.backers = data.backers;
           const date2: any = new Date(data.createdAt);
           const date: any = new Date();
           this.daysPast = Math.round((date-date2) / 86400000);
           if (data.fundingDurataion - this.daysPast <= 0){
             return this.daysLeft = 0;
           }
           this.daysLeft = data.fundingDurataion - this.daysPast;
         });
   }

  ngOnInit() {
  }

}

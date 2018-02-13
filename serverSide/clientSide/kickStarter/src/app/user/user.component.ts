import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userProjects;
  userName;

  constructor(private server: ServerService) {
      server.getUserProjects().subscribe(d=>this.userProjects = d);
      //server.userSub.subscribe(res=>this.userName = res)
   }


   delete(id){
     this.server.deleteProject(id).subscribe(data=>{
       if(data) this.server.getUserProjects().subscribe(d=>this.userProjects = d);
     });

   }

  ngOnInit() {
  }

}

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
      server.getUserProjects().subscribe(projects => this.userProjects = projects); 
   }
   delete(id) {
     this.server.deleteProject(id).subscribe(() => {
        this.server.getUserProjects().subscribe(projects => this.userProjects = projects);
     });
   }

  ngOnInit() {
  }

}

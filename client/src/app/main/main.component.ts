import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  categorys = ['Games','Film','Arts','Publishing','Food & Craft','Design & Tech','Comics & illustration','Music']
  category = "Games";
  projects;

  constructor(private server: ServerService) {
    server.homePreview(this.category).subscribe(data=>{this.projects = data});
   }

  getCategory(value){
    this.category = value;
    this.server.homePreview(value).subscribe(data=>this.projects = data);
  }
  ngOnInit() {
  }

}

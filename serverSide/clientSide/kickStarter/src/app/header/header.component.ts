import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

date = new Date().toLocaleDateString();
totalUsers = 1000;
totalProjects = 200;
monyContributed = '340,000$';
  constructor() { }

  ngOnInit() {
  }

}

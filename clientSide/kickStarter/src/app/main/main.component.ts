import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  categorys = ['Games','Film','Arts','Publishing','Food & Craft','Design & Tech','Comics & illustration','Music']
  category = "Games";
  constructor() { }

  getCategory(value){
    this.category = value;
  }
  ngOnInit() {
  }

}

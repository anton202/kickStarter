import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerStaus;
  constructor(private server:ServerService) { }

  userInfo(data){
    this.server.register(data).subscribe((data)=>this.registerStaus = data);
  }

  ngOnInit() {
  }

}

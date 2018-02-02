import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginStatus;
  constructor(private server:ServerService) { }

  login(data){
    this.server.userLogin(data).subscribe(res=>{this.loginStatus = res;
    this.server.loginState = res.status;
  })
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginStatus;
  constructor(private server:ServerService, private router:Router) { }

  login(data){
    this.server.userLogin(data).subscribe(res=>{this.loginStatus = res;
    this.server.loginState = res.status;
    this.server.userName = res.userName;
    this.server.userId = res.userId;
    if(res.status) this.router.navigate(['/main']);
  })
  }

  ngOnInit() {
  }

}

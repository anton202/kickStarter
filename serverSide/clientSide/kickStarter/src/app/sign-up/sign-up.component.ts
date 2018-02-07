import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerStaus;
  constructor(private server:ServerService, private router:Router) { }

  userInfo(data){
    this.server.register(data).subscribe((data)=>{
      this.registerStaus = data;
      if(data) this.router.navigate(['/sign-in']);
    });

  }

  ngOnInit() {
  }

}

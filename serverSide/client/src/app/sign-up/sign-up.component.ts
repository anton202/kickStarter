import { Component, OnInit } from "@angular/core";
import { ServerService } from "../server.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  registerStatus;
  constructor(private server: ServerService, private router: Router) {}

  userInfo(data) {
    this.server.register(data).subscribe(() => {
      this.registerStatus = 'account created';
      setTimeout(() => this.router.navigate(["/sign-in"]), 2000);
    },
     () => (this.registerStatus = 'email already exist'));
  }

  ngOnInit() {}
}

import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServerService } from "../server.service";

@Component({
  selector: "app-view-all",
  templateUrl: "./view-all.component.html",
  styleUrls: ["./view-all.component.css"]
})
export class ViewAllComponent implements OnInit {
  id;
  projectData;

  constructor(private route: ActivatedRoute, private server: ServerService) {
    route.params.subscribe(params => {
      this.id = params["category"];
    });
    server.getAllProject(this.id).subscribe(data => (this.projectData = data));
  }

  ngOnInit() {}
}

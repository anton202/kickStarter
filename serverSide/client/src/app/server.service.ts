import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Subject } from "rxjs";

@Injectable()
export class ServerService {
  userSub: Subject<string> = new Subject();
  signOut: Subject<boolean> = new Subject();

  constructor(private http: Http) {}

  register(data) {
    return this.http
      .post("/api/user/register", { data });
  }

  userLogin(data) {
    return this.http.post("/api/user/login", { data }).map(res => res.json());
  }

  isLoged() {
    return this.http.get("/api/user/isLoged").map(res => res.json());
  }

  logOut() {
    return this.http.get("/api/user/logOut");
  }

  createProject(data) {
    return this.http.post("/api/user/startProject", { data })
  }

  getAllProject(id) {
    return this.http.get("/api/general/viewAll/" + id).map(res => res.json());
  }

  homePreview(id) {
    return this.http.get("/api/general/preview/" + id).map(res => res.json());
  }

  viewProject(id) {
    return this.http
      .get("/api/general/viewProject/" + id)
      .map(res => res.json());
  }

  getUserProjects() {
    return this.http.get("/api/user/userArea").map(res => res.json());
  }

  deleteProject(id) {
    return this.http
      .delete("/api/user/deletProject/" + id)
      .map(res => res.json());
  }
}

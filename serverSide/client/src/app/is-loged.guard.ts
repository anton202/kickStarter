import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServerService } from './server.service';

@Injectable()
export class IsLogedGuard implements CanActivate {
  constructor(private server: ServerService,private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.server.isLoged().subscribe((res)=>{
        if(!res.status)
        this.router.navigate(['/sign-in'])
        return false;
      })
    return true;
}
}


/*if(!this.server.isLoged()){
this.router.navigate(['/sign-in'])
return false;
}
return true;*/

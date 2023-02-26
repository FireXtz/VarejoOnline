import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthApiService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class GuardasDeRotaService{
    constructor(private router: Router,private authService: AuthApiService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.usuaroIfExist())
          return true;
    
        this.router.navigate(['login']);
        return false;
    
      }
}
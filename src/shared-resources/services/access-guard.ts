import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccessGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const pattern = new RegExp(/participate/);
        // if (this.router.url === '/') {
        //     console.log("Direct entry");
        //     return this.router.parseUrl(route.data.navigateTo)
        // }
        if (!pattern.test(this.router.url) && !sessionStorage.getItem('accessToken')) {
            console.log("Invalid")
            return this.router.parseUrl(route.data.navigateTo)
        }
        return true;
    }
}
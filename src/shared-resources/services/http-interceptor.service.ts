import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupMessageComponent } from '../components/pop-up-message/popup-message.component';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private loaderService: LoaderService, private snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.display(true);
        const pattern = new RegExp(/participate/, 'ig')
        if (!pattern.test(req.url)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            });
        }
        return next.handle(req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.loaderService.display(false);
            }
        }, error => {
            this.loaderService.display(false);
            this.snackBar.openFromComponent(PopupMessageComponent, {
                duration: 4000,
                data: { message: error.error.message, type: 'error' }
            });
        }));
    }
}

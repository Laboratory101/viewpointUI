import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupMessageComponent } from '../pop-up-message/popup-message.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  user$: Observable<firebase.User> = this.authUserService.user$;

  constructor(private router: Router, private authUserService: AuthenticateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  navigateTo(section: string): void {
    this.router.navigate([`/host/${section}`]);
  }

  logout() {
    this.authUserService.logout().pipe(first())
      .subscribe(() => {
        window.location.href = `${window.location.origin}/host/login`;
      }, () => {
        this.snackBar.openFromComponent(PopupMessageComponent, {
          duration: 4000,
          data: { message: 'Resource not found', type: 'error' }
        });
      })
  }

}

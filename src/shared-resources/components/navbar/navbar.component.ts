import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  login() {
    this.authUserService.loginViaGoogle().pipe(first())
      .subscribe(response => {
        console.log("Login success: ", response)
      }, err => {
        console.log("Login Failed: ", err)
      })
  }

  logout() {
    this.authUserService.logout().pipe(first())
      .subscribe(response => {
        console.log("Log out response: ", response)
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authUserService: AuthenticateService, private snackBar: MatSnackBar, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {
    this.authUserService.loginViaGoogle().pipe(first())
      .subscribe(response => {
        this.router.navigate(['./poll'], { relativeTo: this.activatedRoute.parent });
      }, err => {
        console.log("Login Failed: ", err)
      })
  }

}

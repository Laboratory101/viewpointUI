import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authUserService: AuthenticateService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    this.authUserService.loginViaGoogle().pipe(first())
      .subscribe(() => {
        window.location.href = `${window.location.origin}/host/poll`;
      }, () => {
        this.snackBar.openFromComponent(PopupMessageComponent, {
          duration: 4000,
          data: { message: 'Login failed', type: 'error' }
        });
      })
  }

}

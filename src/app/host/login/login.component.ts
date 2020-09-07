import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, switchMap } from 'rxjs/operators';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { AuthorizationService } from 'src/shared-resources/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authUserService: AuthenticateService, private snackBar: MatSnackBar,
    private authTokenService: AuthorizationService) { }

  ngOnInit() {}

  login() {
    this.authUserService.loginViaGoogle().pipe(first(), switchMap(auth => {
      const payload = { name: auth.user.displayName, email: auth.user.email }
      return this.authTokenService.getAuthToken(payload)
    })).subscribe(response => {
      sessionStorage.setItem('accessToken', response.accessToken)
      sessionStorage.setItem('refreshToken', response.refreshToken)
      window.location.href = `${window.location.origin}/host/poll`;
    }, () => {
      this.snackBar.openFromComponent(PopupMessageComponent, {
        duration: 4000,
        data: { message: 'Login failed', type: 'error' }
      });
    })
  }

}

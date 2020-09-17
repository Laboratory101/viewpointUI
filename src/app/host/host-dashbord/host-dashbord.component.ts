import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { forkJoin, Subject } from 'rxjs';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { AuthorizationService } from 'src/shared-resources/services/authorization.service';
import { first, tap, takeUntil } from 'rxjs/operators';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { TimerPopupComponent } from 'src/shared-resources/components/timer-popup/timer-popup.component';
import { tapOnce } from 'src/shared-resources/services/utility';

@Component({
  selector: 'app-host-dashbord',
  templateUrl: './host-dashbord.component.html',
  styleUrls: ['./host-dashbord.component.scss']
})
export class HostDashbordComponent implements OnInit, OnDestroy {

  displayTimer: boolean;
  timerValue: number;
  private unsubscribe$: Subject<void>;

  constructor(private userIdle: UserIdleService, private authUserService: AuthenticateService, private snackBar: MatSnackBar,
    private authorizationService: AuthorizationService, private dialog: MatDialog) { }

  ngOnInit() {
    this.displayTimer = false
    this.unsubscribe$ = new Subject<void>();
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().pipe(takeUntil(this.unsubscribe$), tap(() => {
      if (!this.displayTimer) {
        this.displayTimer = true
      }
    }))
      .subscribe(count => {
        console.log('Timer started: ', count)
        this.timerValue = count
      });
    this.userIdle.onTimeout().pipe(takeUntil(this.unsubscribe$), tap(() => this.displayTimer = false)).subscribe(() => this.logout());
    this.userIdle.ping$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.refreshSession())
  }

  extendSession(choice: boolean) {
    this.displayTimer = false
    if (choice) {
      this.userIdle.resetTimer()
    } else {
      this.logout()
    }
  }

  private logout() {
    forkJoin([
      this.authUserService.logout().pipe(takeUntil(this.unsubscribe$), first()),
      this.authorizationService.revokeToken().pipe(takeUntil(this.unsubscribe$), tap(_ => sessionStorage.clear()))
    ]).subscribe((results) => {
      window.location.href = `${window.location.origin}/host/login`;
    }, () => {
      this.snackBar.openFromComponent(PopupMessageComponent, {
        duration: 4000,
        data: { message: 'Resource not found', type: 'error' }
      });
    })
  }

  private refreshSession() {
    this.authorizationService.refreshToken().pipe(takeUntil(this.unsubscribe$),
      tap(() => sessionStorage.removeItem('accessToken'))).
      subscribe((data) => {
        sessionStorage.setItem('accessToken', data.accessToken)
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

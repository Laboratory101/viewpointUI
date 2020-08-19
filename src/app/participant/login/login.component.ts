import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { PollService } from 'src/app/poll/poll.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide: boolean;
  password: string;
  shouldAllow: boolean;
  responseData: any;
  private unSubscribe$: Subject<any>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pollService: PollService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.unSubscribe$ = new Subject();
    this.hide = true;
    this.password = '';
    this.shouldAllow = false;
    this.getContestData().then(data => this.responseData = { ...data })
      .catch(err => {
        this.snackBar.openFromComponent(PopupMessageComponent, {
          duration: 4000,
          data: { message: 'Resource not found', type: 'error' }
        });
      });
  }

  async getContestData(): Promise<any> {
    const parameterData: Params = await this.activatedRoute.queryParams.pipe(first()).toPromise();
    if (parameterData.type === 'poll') {
      return await this.pollService.fetchPollById(parameterData.id).toPromise();
    }
  }

  logIn() {
    const { privacyType, pin } = this.responseData;
    if (privacyType === 1) {
      if (pin === this.password) {
        this.router.navigate(['./cast-vote'], { relativeTo: this.activatedRoute.parent, state: this.responseData });
      } else {
        this.snackBar.openFromComponent(PopupMessageComponent, {
          duration: 4000,
          data: { message: 'Please enter a valid pin', type: 'error' }
        });
      }
    } else {
      this.router.navigate(['./cast-vote'], { relativeTo: this.activatedRoute.parent, state: this.responseData });
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
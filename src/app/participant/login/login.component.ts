import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { addDays } from 'src/shared-resources/services/utility';
import { ParticipantService } from '../participant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide: boolean;
  password: string;
  shouldAllow: boolean;
  private unSubscribe$: Subject<any>;
  private parameterData: { type: string, id: string }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private participant: ParticipantService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.unSubscribe$ = new Subject();
    this.hide = true;
    this.password = '';
    this.shouldAllow = false;
    // this.getContestData().then(data => this.responseData = { ...data })
    //   .catch(err => {
    //     this.snackBar.openFromComponent(PopupMessageComponent, {
    //       duration: 4000,
    //       data: { message: 'Resource not found', type: 'error' }
    //     });
    //   });
    this.activatedRoute.queryParams.pipe(takeUntil(this.unSubscribe$), first())
      .subscribe((data: any) => this.parameterData = { ...data })
  }

  // async getContestData(): Promise<any> {
  //   const parameterData: Params = await this.activatedRoute.queryParams.pipe(first()).toPromise();
  //   if (parameterData.type === 'poll') {
  //     return await this.participant.fetchPoll({ pollId: parameterData.id }).toPromise();
  //   }
  // }

  logIn() {
    // if (!!this.responseData && Object.keys(this.responseData).length) {
    //   const { privacyType, pin, createdAt, duration } = this.responseData;
    //   const today: number = new Date().getTime();
    //   const expire: Date = addDays(createdAt, duration)
    //   if (today <= expire.getTime()) {
    //     if (privacyType === 1) {
    //       if (pin === this.password) {
    //         this.router.navigate(['./cast-vote'], { relativeTo: this.activatedRoute.parent, state: this.responseData });
    //       } else {
    //         this.snackBar.openFromComponent(PopupMessageComponent, {
    //           duration: 4000,
    //           data: { message: 'Please enter a valid pin', type: 'error' }
    //         });
    //       }
    //     } else {
    //       this.router.navigate(['./cast-vote'], { relativeTo: this.activatedRoute.parent, state: this.responseData });
    //     }
    //   } else {
    //     this.snackBar.openFromComponent(PopupMessageComponent, {
    //       duration: 4000,
    //       data: { message: `This Poll has expired on ${expire}`, type: 'info' }
    //     });
    //   }
    // } else {
    //   this.snackBar.openFromComponent(PopupMessageComponent, {
    //     duration: 4000,
    //     data: { message: `Invalid URL or the requested Poll is not found!`, type: 'error' }
    //   });
    // }
    // const parameterData: Params = await this.activatedRoute.queryParams.pipe(first()).toPromise();
    const payload = { pollId: this.parameterData.id, pin: this.password }
    if (this.parameterData.type === 'poll') {
      this.participant.fetchPoll(payload).pipe(takeUntil(this.unSubscribe$)).subscribe(response => {
        console.log("Response: ", response)
        this.router.navigate(['./cast-vote'], { relativeTo: this.activatedRoute.parent, state: response });
      }, err => {
        console.log("Error: ", err);
      })
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}

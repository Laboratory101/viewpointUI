import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, takeUntil, switchMap } from 'rxjs/operators';
import { FireBaseService } from 'src/shared-resources/services/firebase.service';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll-board.component.html',
  styleUrls: ['./poll-board.component.scss']
})
export class PollBoardComponent implements OnInit {

  pollList$: Observable<any>;
  mockHost = 'alec';
  pollURL: Array<string>;
  user$: Observable<firebase.User> = this.authUserService.user$;
  private unSubscribe$: Subject<any>;

  constructor(private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute,
    private fireStore: FireBaseService, private snackBar: MatSnackBar, private authUserService: AuthenticateService) { }

  ngOnInit(): void {
    this.unSubscribe$ = new Subject();
    this.pollURL = [];
    // this.pollList$ = this.pollService.fetchAllPolls(this.mockHost).pipe(takeUntil(this.unSubscribe$),
    //   tap(pollData => pollData.forEach((poll: any, index: number) => {
    //     const url: string = `URL: ${window.location.origin}/participate?type=poll&id=${poll._id}`;
    //     if (poll.privacyType === 1) {
    //       const password: string = `Password: ${poll.pin}`
    //       this.pollURL[index] = url.concat(`\n`, password)
    //     } else {
    //       this.pollURL[index] = url
    //     }
    //   }
    //   ))
    // );
    this.pollList$ = this.user$.pipe(tap(console.log), switchMap((auth: any) => this.pollService.fetchAllPolls(auth.providerData[0].email)
      .pipe(takeUntil(this.unSubscribe$),
        tap(pollData => pollData.forEach((poll: any, index: number) => {
          const url: string = `URL: ${window.location.origin}/participate?type=poll&id=${poll._id}`;
          if (poll.privacyType === 1) {
            const password: string = `Password: ${poll.pin}`
            this.pollURL[index] = url.concat(`\n`, password)
          } else {
            this.pollURL[index] = url
          }
        }
        ))
      ))
    )
  }

  getPollInfo(pollData?: any): void {
    this.router.navigate(['./viewpoll'], { relativeTo: this.activatedRoute.parent, state: pollData });
  }

  deletePoll(pollId: string): void {
    this.pollService.deletePollDetails(pollId).pipe(takeUntil(this.unSubscribe$), tap(async response => {
      if (response) {
        try {
          await this.fireStore.deleteImage(pollId)
        } catch (err) {
          throwError(err)
        }
      }
    })).subscribe(res => {
      this.snackBar.openFromComponent(PopupMessageComponent, {
        duration: 4000,
        data: { message: 'Deleted successfully', type: 'success' }
      });
    }, err => console.log(err))
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}

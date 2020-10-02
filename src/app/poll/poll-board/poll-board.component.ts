import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, takeUntil, switchMap } from 'rxjs/operators';
import { FireBaseService } from 'src/shared-resources/services/firebase.service';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-poll',
  templateUrl: './poll-board.component.html',
  styleUrls: ['./poll-board.component.scss']
})
export class PollBoardComponent implements OnInit {

  pollList$: Observable<any>;
  pollURL: Array<string>;
  user$: Observable<firebase.User> = this.authUserService.user$;
  showResult: boolean;
  selectedPoll: any;
  private unSubscribe$: Subject<any>;

  constructor(private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute,
    private fireStore: FireBaseService, private snackBar: MatSnackBar, private authUserService: AuthenticateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showResult = false;
    this.unSubscribe$ = new Subject();
    this.pollURL = [];
    this.loadAllPolls()
  }

  getPollInfo(pollData?: any): void {
    this.selectedPoll = { ...pollData };
    this.router.navigate(['./viewpoll'], { relativeTo: this.activatedRoute.parent, state: this.selectedPoll });
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
      this.loadAllPolls();
      this.snackBar.openFromComponent(PopupMessageComponent, {
        duration: 4000,
        data: { message: 'Deleted successfully', type: 'success' }
      });
    }, err => console.log(err))
  }

  displayResult(pollData) {
    this.selectedPoll = { ...pollData };
    this.showResult = true;
  }

  close(event) {
    this.showResult = false;
  }

  loadAllPolls() {
    this.pollList$ = this.user$.pipe(switchMap((auth: any) => this.pollService.fetchAllPolls(auth.providerData[0].email)
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

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}

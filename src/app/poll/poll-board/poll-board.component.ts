import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, takeUntil, switchMap } from 'rxjs/operators';
import { FireBaseService } from 'src/shared-resources/services/firebase.service';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PollResultComponent } from 'src/shared-resources/components/poll-result/poll-result.component';
import { addDays, generateChartData } from 'src/shared-resources/services/utility';

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
  private dialogRef: MatDialogRef<PollResultComponent>

  constructor(private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute,
    private fireStore: FireBaseService, private snackBar: MatSnackBar, private authUserService: AuthenticateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.unSubscribe$ = new Subject();
    this.pollURL = [];
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

  displayResult(pollData) {
    console.log("Poll data: ", pollData)
    const result = this.generateDisplayData(pollData);
    this.dialogRef = this.dialog.open(PollResultComponent, {
      width: '500px',
      data: result
    })

    this.dialogRef.afterClosed().subscribe()
  }

  private generateDisplayData(data: any) {
    const { createdAt, duration, resultDisplayType, candidates, participantCount, title, description } = data;
    const resultIn = addDays(createdAt, duration).toDateString();
    const statusTitle = (resultDisplayType === 1) ? 'Ends on' : 'Result on'
    const chartData = [...generateChartData(candidates, resultDisplayType)];
    const payload = {
      chartData,
      statusTitle,
      resultIn,
      expectedCount: participantCount,
      participantCount: this.getParticipantCount(candidates),
      title,
      description,
      resultDisplayType,
    }
    console.log("Payload: ", payload)
    return payload;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  private getParticipantCount(voteData: Array<any>): number {
    return voteData.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)
  }

}

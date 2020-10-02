import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addDays, generateChartData } from 'src/shared-resources/services/utility';
import { WebsocketService } from 'src/shared-resources/services/websocket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent implements OnInit, OnDestroy {

  pollData: any;
  defaultURL: string;
  isSelected: { status: boolean, ref: number };
  selectedCandidate: string;
  disableVote: boolean;
  displayResult: boolean;

  private unSubscribe$: Subject<any>;

  constructor(private participantService: ParticipantService, private snackBar: MatSnackBar, private socketService: WebsocketService) { }

  ngOnInit() {
    this.unSubscribe$ = new Subject();
    this.defaultURL = 'assets/no_img.webp';
    this.disableVote = false;
    this.isSelected = { status: false, ref: null };
    this.pollData = { ...window.history.state };
    const { createdAt, duration } = this.pollData;
    const today: number = new Date().getTime();
    const expire: Date = addDays(createdAt, duration)
    if (today >= expire.getTime()) {
      this.displayResult = true
    } else {
      this.displayResult = false;
    }
  }

  selectCandidate(candidateId: string, index: number): void {
    this.isSelected = { ...this.isSelected, status: true, ref: index }
    this.selectedCandidate = candidateId;
  }

  castVote(): void {
    this.disableVote = true;
    let status = { message: '', type: '' }
    this.participantService.castVote({ pollId: this.pollData._id, candidateId: this.selectedCandidate }).pipe(takeUntil(this.unSubscribe$)).subscribe(response => {
      status = { ...status, message: response.message, type: 'success' }
    }, err => {
      status = { ...status, message: err.error.message, type: 'error' }
    }, () => {
      this.snackBar.openFromComponent(PopupMessageComponent, {
        duration: 4000,
        data: status
      });
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}

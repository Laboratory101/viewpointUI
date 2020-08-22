import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addDays } from 'src/shared-resources/services/utility';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent implements OnInit {

  pollData: any;
  defaultURL: string;
  resultIn: string;
  isSelected: { status: boolean, ref: number };
  selectedCandidate: string;
  disableVote: boolean;
  statusTitle: string
  constructor(private participantService: ParticipantService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.disableVote = false;
    this.isSelected = { status: false, ref: null };
    this.defaultURL = 'assets/no_img.webp';
    this.pollData = { ...window.history.state };
    const { createdAt, duration, resultDisplayType } = this.pollData
    this.resultIn = addDays(createdAt, duration).toDateString();
    console.log('Polldata: ', this.pollData);
    this.statusTitle = (resultDisplayType === 1) ? 'Ends on' : 'Result on'
  }

  selectCandidate(candidateId: string, index: number): void {
    this.isSelected = { ...this.isSelected, status: true, ref: index }
    this.selectedCandidate = candidateId;
  }

  castVote(): void {
    this.disableVote = true;
    let status = { message: '', type: '' }
    this.participantService.castVote({ pollId: this.pollData._id, candidateId: this.selectedCandidate }).pipe().subscribe(response => {
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

}

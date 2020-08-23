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
  chartData: Array<{ label: string, value: number }>;
  displayResult: boolean;

  constructor(private participantService: ParticipantService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displayResult = false;
    this.pollData = { ...window.history.state };
    const { createdAt, duration, resultDisplayType, candidates } = this.pollData
    const today: number = new Date().getTime();
    const expire: Date = addDays(createdAt, duration)
    if (today >= expire.getTime()) {
    } else {
      this.disableVote = false;
      this.isSelected = { status: false, ref: null };
      this.defaultURL = 'assets/no_img.webp';
      this.resultIn = addDays(createdAt, duration).toDateString();
      this.statusTitle = (resultDisplayType === 1) ? 'Ends on' : 'Result on'
      this.chartData = [...this.generateChartData(candidates, resultDisplayType)];
    }
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

  private generateChartData(dataSource: Array<any>, displayType: number): Array<{ label: string, value: number }> {
    return dataSource.map((data: any, index: number) => ({
      label: data.text || `Cndt ${index}`,
      value: (displayType === 1) ? data.count : 0
    }));
  }

}

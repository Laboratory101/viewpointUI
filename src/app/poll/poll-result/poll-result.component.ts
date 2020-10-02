import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addDays, generateChartData } from 'src/shared-resources/services/utility';
import { WebsocketService } from 'src/shared-resources/services/websocket.service';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss']
})
export class PollResultComponent implements OnInit, OnDestroy {

  @Input() widget: boolean = false;
  @Input() pollData: any;
  @Output() readonly closeResult: EventEmitter<boolean> = new EventEmitter<boolean>()

  chartData: Array<{ label: string, value: number }>;
  statusTitle: string
  resultIn: string;
  participantCount: number;
  math = Math;

  private unSubscribe$: Subject<void>;

  constructor(private socketService: WebsocketService) { }

  ngOnInit() {
    this.unSubscribe$ = new Subject<void>();
    const { createdAt, duration, resultDisplayType, candidates, _id } = this.pollData;
    this.resultIn = addDays(createdAt, duration).toDateString();
    if (resultDisplayType === 1) {
      this.statusTitle = 'Ends on'
      this.socketService.joinRoom(_id);
      this.socketService.broadcastMessage().pipe(takeUntil(this.unSubscribe$)).subscribe((pollData: any) => {
        this.participantCount = this.getParticipantCount(pollData.candidates);
        this.chartData = [...generateChartData(pollData, resultDisplayType)];
      })
    } else {
      this.statusTitle = 'Result on'
      this.participantCount = this.getParticipantCount(candidates);
      this.chartData = [...generateChartData(candidates, resultDisplayType)];
    }
  }

  close() {
    this.closeResult.emit(true);
  }

  private getParticipantCount(voteData: Array<any>): number {
    return voteData.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}

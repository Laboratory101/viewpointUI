import { Component, OnInit, Inject, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'timer-popup',
  templateUrl: './timer-popup.component.html',
  styleUrls: ['./timer-popup.component.scss']
})
export class TimerPopupComponent implements OnInit, OnChanges {

  value: number;

  @Input() timer: number;
  @Output() readonly userAction: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.timer && this.timer) {
      this.value = (60 - this.timer)
    }
  }

  shouldReset(status: boolean) {
    this.userAction.emit(status);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-timer-popup',
  templateUrl: './timer-popup.component.html',
  styleUrls: ['./timer-popup.component.scss']
})
export class TimerPopupComponent implements OnInit {

  timer: number;

  constructor(private dialogRef: MatDialogRef<TimerPopupComponent>) { }

  ngOnInit(): void {
    this.timer = 60;
  }

  shouldReset(status: boolean) {
    this.dialogRef.close(status);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onConfirm(): void {
    this.dialogRef.close({ status: true, data: this.data.input });
  }

  onCancel(): void {
    this.dialogRef.close({ status: false, data: null });
  }

}

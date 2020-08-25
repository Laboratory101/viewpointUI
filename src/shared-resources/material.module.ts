import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatTooltipModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatMenuModule, MatDividerModule
} from '@angular/material';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'


@NgModule({
  declarations: [],
  exports: [
    MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatTooltipModule, MatRadioModule, MatFormFieldModule, MatInputModule,
    MatDialogModule, MatMenuModule, MatDividerModule, ChartsModule, WavesModule
  ]
})
export class MaterialModule { }

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import validator from 'validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { createUUID } from 'src/shared-resources/services/utility';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationBoxComponent } from 'src/shared-resources/components/confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-poll-candidate',
  templateUrl: './poll-candidate.component.html',
  styleUrls: ['./poll-candidate.component.scss']
})
export class PollCandidateComponent implements OnInit, OnDestroy {

  @Input() parentForm: FormGroup;
  @Input() private candidates: Array<any>;
  @Output() private readonly uploadedImages: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();

  candidateForm: FormGroup;
  imageSrc: any;
  imageList: Array<File>;
  private unSubscribe$: Subject<any>;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.unSubscribe$ = new Subject();
    this.imageSrc = [];
    this.imageList = [];
    this.candidateForm = this.formBuilder.group({
      candidates: new FormArray([])
    });
    this.parentForm.addControl('candidates', this.candidateForm.get('candidates'));
    if (this.candidates.length) {
      this.candidates.forEach((data: any, index: number) => {
        this.addCandidate(data);
        this.imageSrc[index] = data.imgUrl;
        this.parentForm.disable();
      });
    } else {
      for (let count = 1; count <= 2; count++) {
        this.addCandidate();
      }
    }
  }

  addCandidate(data?: any) {
    const candidateArray = this.candidateForm.get('candidates') as FormArray;
    const newCandidate: FormGroup = this.formBuilder.group(
      {
        _id: [((data && data._id) ? data._id : createUUID()), Validators.required],
        imgUrl: [((data && data.imgUrl) ? data.imgUrl : null), [this.isURLValid]],
        text: [((data && data.text) ? data.text : null), [Validators.minLength(1), Validators.maxLength(50)]],
      }
    );
    candidateArray.push(newCandidate);
  }

  uploadFile(event: any, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.handleInputChange(event, index);
  }

  dropFile(event: any, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.handleInputChange(event, index);
  }

  setDefaultPic(index: number) {
    this.imageSrc[index] = 'assets/no_img.webp';
  }

  confirmDelete(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '450px',
      data: { message: 'You are removing this candidate details! This operation cannot be un done', input: index }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unSubscribe$)).subscribe(response => {
      if (response.status) {
        const candidateArray = this.candidateForm.get('candidates') as FormArray;
        candidateArray.removeAt(response.data);
      }
    });
  }

  private handleInputChange(event: any, index: number) {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    const pattern = /image-*/;
    const reader: FileReader = new FileReader();
    if (!file.type.match(pattern)) {
      this.snackBar.openFromComponent(PopupMessageComponent, {
        duration: 4000,
        data: { message: 'Only images can be uploaded', type: 'info' }
      });
      return;
    }
    this.imageList[index] = file;
    reader.readAsDataURL(file);
    reader.onload = (evnt) => {
      this.imageSrc[index] = reader.result;
    };
    this.uploadedImages.emit(this.imageList);
  }

  private isURLValid(control: AbstractControl): { [key: string]: boolean | null } {
    if (control.value) {
      if (!validator.isURL(control.value, { protocols: ['http', 'https'] })) {
        return { invalidURL: true };
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}

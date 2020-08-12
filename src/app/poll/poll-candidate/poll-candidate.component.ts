import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import validator from 'validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { createUUID } from 'src/shared-resources/services/utility';

@Component({
  selector: 'app-poll-candidate',
  templateUrl: './poll-candidate.component.html',
  styleUrls: ['./poll-candidate.component.scss']
})
export class PollCandidateComponent implements OnInit {

  @Input() private parentForm: FormGroup;
  @Input() private candidates: Array<any>;

  candidateForm: FormGroup;
  imageSrc: any;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.imageSrc = [];
    this.candidateForm = this.formBuilder.group({
      candidates: new FormArray([])
    });
    this.parentForm.addControl('candidates', this.candidateForm.get('candidates'));
    if (this.candidates.length) {
      this.candidates.forEach((data: any, index: number) => {
        this.addCandidate(data, index);
      });
    } else {
      for (let count = 1; count <= 4; count++) {
        this.addCandidate();
      }
    }
  }

  addCandidate(data?: any, index?: number) {
    const candidateArray = this.candidateForm.get('candidates') as FormArray;
    const uuid: string = createUUID();
    let newCandidate: FormGroup;
    if (!!data) {
      newCandidate = this.formBuilder.group(
        {
          _id: [data._id, Validators.required],
          imgUrl: [data.imgUrl || null, [this.isURLValid]],
          text: [data.text || '', [Validators.minLength(1), Validators.maxLength(50)]],
        }
      );
      this.imageSrc[index] = null;
    } else {
      newCandidate = this.formBuilder.group(
        {
          _id: [uuid, Validators.required],
          imgUrl: ['', [this.isURLValid]],
          text: ['', [Validators.minLength(1), Validators.maxLength(50)]],
        }
      );
    }
    candidateArray.push(newCandidate);
  }

  removeCandidate(index: number) {
    const candidateArray = this.candidateForm.get('candidates') as FormArray;
    candidateArray.removeAt(index);
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
    reader.readAsDataURL(file);
    reader.onload = (evnt) => {
      this.imageSrc[index] = reader.result;
    };
  }

  private isURLValid(control: AbstractControl): { [key: string]: boolean | null } {
    if (control.value) {
      if (!validator.isURL(control.value, { protocols: ['http', 'https'] })) {
        return { invalidURL: true };
      }
    }
    return null;
  }

}

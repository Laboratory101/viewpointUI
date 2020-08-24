import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createUUID } from 'src/shared-resources/services/utility';
import { Router, ActivatedRoute } from '@angular/router';
import { FireBaseService } from 'src/shared-resources/services/firebase.service';
import { PollService } from '../poll.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PopupMessageComponent } from 'src/shared-resources/components/pop-up-message/popup-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit, OnDestroy {

  pollForm: FormGroup;
  pollData: any;
  candidateData: any;
  buttonOperation: string;
  private imagesToUpload: Array<File>;
  private unSubscribe$: Subject<any>;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private fireBase: FireBaseService, private pollService: PollService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.unSubscribe$ = new Subject();
    this.pollData = window.history.state._id ? { ...window.history.state } : null;
    this.pollForm = this.formBuilder.group({
      _id: [((!!this.pollData && this.pollData._id) ? this.pollData._id : createUUID()), Validators.required],
      title: [((!!this.pollData && this.pollData.title) ? this.pollData.title : ''), [Validators.required, Validators.maxLength(50)]],
      description: [((!!this.pollData && this.pollData.description) ? this.pollData.description : '')],
      participantCount: [((!!this.pollData && this.pollData.participantCount) ? this.pollData.participantCount : 3), [Validators.min(3)]],
      duration: [((!!this.pollData && this.pollData.duration) ? this.pollData.duration : 7), [Validators.max(30)]],
      privacyType: [((!!this.pollData && !!this.pollData.privacyType != null) ? this.pollData.privacyType.toString() : null),
      Validators.required],
      resultDisplayType: [((!!this.pollData && this.pollData.resultDisplayType != null) ? this.pollData.resultDisplayType.toString() : null)
        , Validators.required],
      author: [((!!this.pollData && this.pollData.author) ? this.pollData.author : ''), [Validators.maxLength(100)]]
    });
    if (!!this.pollData) {
      this.candidateData = [...this.pollData.candidates];
      this.buttonOperation = 'Edit';
    } else {
      this.candidateData = [];
      this.buttonOperation = 'Submit';
    }
    this.imagesToUpload = [];
  }

  async saveOrEditPoll(operation: string) {
    if (operation === 'Edit') {
      this.pollForm.enable();
      this.buttonOperation = 'Update';
    } else {
      this.pollForm.disable();
      const { _id, candidates, participantCount } = this.pollForm.getRawValue();
      if (participantCount < candidates.length) {
        this.snackBar.openFromComponent(PopupMessageComponent, {
          duration: 4000,
          data: { message: `Number of participants are less than candidates. Please have minimum of ${candidates.length + 1} participants`, type: 'error' }
        });
        this.pollForm.enable();
      }
      else {
        if (this.imagesToUpload.length) {
          for (let index = 0; index < this.imagesToUpload.length; index++) {
            const path = `${_id}/${index + 1}`;
            const imgFile: File = this.imagesToUpload[index];
            const imgURL = await this.fireBase.uploadImage(imgFile, path).toPromise();
            this.pollForm.get('candidates')['controls'][index].get('imgUrl').setValue(imgURL || '');
          }
        }
        const formData = this.pollForm.getRawValue();
        formData.privacyType = parseInt(formData.privacyType, 10)
        formData.resultDisplayType = parseInt(formData.resultDisplayType, 10)
        formData.host = 'alec';
        if (operation === 'Update') {
          this.pollService.updatePollDetails(formData).pipe(takeUntil(this.unSubscribe$)).subscribe(response => {
            this.snackBar.openFromComponent(PopupMessageComponent, {
              duration: 4000,
              data: { message: response.message, type: 'success' }
            });
            this.goTOPolls();
          }, err => {
            console.log('Error update: ', err);
          });
        } else if (operation === 'Submit') {
          this.pollService.savePollDetails(formData).pipe(takeUntil(this.unSubscribe$)).subscribe(response => {
            this.snackBar.openFromComponent(PopupMessageComponent, {
              duration: 4000,
              data: { message: response.message, type: 'success' }
            });
            this.goTOPolls();
          }, err => {
            console.log('Error save: ', err);
          });
        }
      }
    }
  }

  goTOPolls(): void {
    this.router.navigate(['./pollboard'], { relativeTo: this.activatedRoute.parent });
  }

  storeImages(imageFiles: Array<File>): void {
    this.imagesToUpload = [...imageFiles];
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}

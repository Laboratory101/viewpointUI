import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createUUID } from 'src/shared-resources/services/utility';
import { Router, ActivatedRoute } from '@angular/router';
import { FireBaseService } from 'src/shared-resources/services/firebase.service';
import { PollService } from '../poll.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit {

  pollForm: FormGroup;
  pollData: any;
  candidateData: any;
  buttonOperation: string;
  private imagesToUpload: Array<File>;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
              private fireBase: FireBaseService, private pollService: PollService) { }

  ngOnInit() {
    this.pollData = window.history.state.pollId ? { ...window.history.state } : null;
    this.pollForm = this.formBuilder.group({
      pollId: [((!!this.pollData && this.pollData.pollId) ? this.pollData.pollId : createUUID()), Validators.required],
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
      this.buttonOperation = 'Submit';
    } else {
      this.pollForm.disable();
      if (this.imagesToUpload.length) {
        const { title, pollId, candidates } = this.pollForm.getRawValue();
        for (let index = 0; index < this.imagesToUpload.length; index++) {
          const path = `${title}/${pollId}/${candidates[index].candidateId}`;
          const imgFile: File = this.imagesToUpload[index];
          const imgURL = await this.fireBase.uploadImage(imgFile, path).toPromise();
          this.pollForm.get('candidates').controls[index].get('imgUrl').setValue(imgURL || '');
        }
      }
      const formData = this.pollForm.getRawValue();
      formData.host = 'alec';
      this.pollService.savePollDetails(formData).subscribe(() => {
        this.goTOPolls();
      }, err => {
        console.log('Error save: ', err);
      });
    }
  }

  goTOPolls(): void {
    this.router.navigate(['./pollboard'], { relativeTo: this.activatedRoute.parent });
  }

  storeImages(imageFiles: Array<File>): void {
    this.imagesToUpload = [...imageFiles];
  }

}

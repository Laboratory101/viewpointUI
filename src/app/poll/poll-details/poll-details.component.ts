import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createUUID } from 'src/shared-resources/services/utility';
import { Router, ActivatedRoute } from '@angular/router';
import { FireBaseService } from 'src/shared-resources/services/firebase.service';
import { PollService } from '../poll.service';

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
    this.pollData = window.history.state._id ? { ...window.history.state } : null;
    this.pollForm = this.formBuilder.group({
      _id: [((!!this.pollData && this.pollData._id) ? this.pollData._id : createUUID()), Validators.required],
      title: [((!!this.pollData && this.pollData.title) ? this.pollData.title : ''), [Validators.required, Validators.maxLength(50)]],
      description: [((!!this.pollData && this.pollData.description) ? this.pollData.description : '')],
      participantCount: [((!!this.pollData && this.pollData.participantCount) ? this.pollData.participantCount : 2), [Validators.min(2)]],
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

  saveOrEditPoll(operation: string): void {
    if (operation === 'Edit') {
      this.pollForm.enable();
      this.buttonOperation = 'Submit';
    } else {
      if (this.imagesToUpload.length) {
        const { title, _id, candidates } = this.pollForm.getRawValue();
        this.imagesToUpload.forEach(async (imgFile: File, index: number) => {
          const path = `${title}/${_id}/${candidates[index]._id}`;
          const imgURL = await this.fireBase.uploadImage(imgFile, path);
          this.pollForm.get('candidates')[index].get('imgUrl').setValue(imgURL);
        });
      }
      console.log('Form: ', this.pollForm.value);
      this.pollForm.disable();
      // this.pollService.savePollDetails(this.pollForm.value);
    }
  }

  goTOPolls(): void {
    this.router.navigate(['./pollboard'], { relativeTo: this.activatedRoute.parent });
  }

  storeImages(imageFiles: Array<File>): void {
    this.imagesToUpload = [...imageFiles];
  }

}

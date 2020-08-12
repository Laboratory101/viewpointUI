import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { createUUID } from 'src/shared-resources/services/utility';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit {

  pollForm: FormGroup;
  pollData: any = {};
  candidateData: any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pollData = { ...window.history.state };
    this.candidateData = [...this.pollData.candidates];
    const uuid: string = createUUID();
    if (!!this.pollData) {
      this.pollForm = this.formBuilder.group({
        _id: [this.pollData._id, Validators.required],
        title: [this.pollData.title || null, [Validators.required, Validators.maxLength(50)]],
        description: [this.pollData.description || ''],
        participantCount: [this.pollData.participantCount || '', [Validators.min(4)]],
        duration: [this.pollData.duration, [Validators.max(30)]],
        privacyType: [this.pollData.privacyType.toString(), [Validators.required]],
        resultDisplayType: [this.pollData.resultDisplayType.toString(), [Validators.required]],
        author: [this.pollData.author || '', [Validators.maxLength(100)]]
      });
    } else {
      this.pollForm = this.formBuilder.group({
        _id: [uuid, Validators.required],
        title: ['', [Validators.required, Validators.maxLength(50)]],
        description: [''],
        participantCount: [4, [Validators.min(4)]],
        duration: [7, [Validators.max(30)]],
        privacyType: [1, Validators.required],
        resultDisplayType: [1, Validators.required],
        author: ['', [Validators.maxLength(100)]]
      });
    }
  }

  savePoll(): void {
    console.log('Form: ', this.pollForm.value);
  }

}

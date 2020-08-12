import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createUUID } from 'src/shared-resources/services/utility';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

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
  }

  saveOrEditPoll(operation: string): void {
    if (operation === 'Edit') {
      this.buttonOperation = 'Submit';
    } else {
      console.log('Form: ', this.pollForm.value);
    }
  }

  goTOPolls(): void {
    this.router.navigate(['./pollboard'], { relativeTo: this.activatedRoute.parent });
  }

}

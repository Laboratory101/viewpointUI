import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit {

  pollForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // console.log("Data sent", window.history.state)
    this.pollForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      participantCount: [4, [Validators.min(4)]],
      duration: [7, [Validators.max(30)]],
      privacyType: [1, Validators.required],
      resultDisplayType: [1, Validators.required],
      author: ['', [Validators.maxLength(100)]]
    });
  }

  savePoll(): void {
    console.log('Form: ', this.pollForm.value);
  }

}

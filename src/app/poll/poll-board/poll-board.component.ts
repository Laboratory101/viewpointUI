import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll-board.component.html',
  styleUrls: ['./poll-board.component.scss']
})
export class PollBoardComponent implements OnInit {

  pollList$: Observable<any>;
  mockHost = 'alec';

  constructor(private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.pollList$ = this.pollService.fetchAllPolls(this.mockHost);
  }

  getPollInfo(pollData?: any) {
    this.router.navigate(['./viewpoll'], { relativeTo: this.activatedRoute.parent, state: pollData });
  }

}

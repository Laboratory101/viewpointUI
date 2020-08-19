import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-poll',
  templateUrl: './poll-board.component.html',
  styleUrls: ['./poll-board.component.scss']
})
export class PollBoardComponent implements OnInit {

  pollList$: Observable<any>;
  mockHost = 'alec';
  pollURL: Array<string>;

  constructor(private pollService: PollService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.pollURL = [];
    this.pollList$ = this.pollService.fetchAllPolls(this.mockHost).pipe(
      tap(pollData => pollData.forEach((poll: any, index: number) =>
        this.pollURL[index] = `${window.location.origin}/participate?type=poll&id=${poll._id}`
      ))
    );
  }

  getPollInfo(pollData?: any) {
    this.router.navigate(['./viewpoll'], { relativeTo: this.activatedRoute.parent, state: pollData });
  }

}

import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  pollList$: Observable<any>;

  constructor(private pollService: PollService) { }

  ngOnInit(): void {
    // this.pollList$ = this.pollService.fetchAllPolls('');
    // this.pollList$ = of([
    //   {
    //     title:'Test 1',
    //     description:'Desc of Test 1'
    //   },
    //   {
    //     title:'Test 2',
    //     description:'Desc of Test 2'
    //   },
    //   {
    //     title:'Test 3'
    //   }
    // ])
  }

}

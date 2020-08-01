import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollBoardComponent } from './poll-board.component';

describe('PollBoardComponent', () => {
  let component: PollBoardComponent;
  let fixture: ComponentFixture<PollBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

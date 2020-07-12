import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDashbordComponent } from './host-dashbord.component';

describe('HostDashbordComponent', () => {
  let component: HostDashbordComponent;
  let fixture: ComponentFixture<HostDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

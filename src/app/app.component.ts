import { Component, OnInit, AfterViewInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/shared-resources/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.status;
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

}

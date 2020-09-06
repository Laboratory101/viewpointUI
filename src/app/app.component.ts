import { Component, OnInit, AfterViewInit, AfterContentChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/shared-resources/services/loader.service';
import { AuthenticateService } from 'src/shared-resources/services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService, private cdref: ChangeDetectorRef, private authUserService: AuthenticateService) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.status;
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
  }

}

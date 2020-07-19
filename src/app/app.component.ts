import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/shared-resources/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'viewpointUI';
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.status;
  }

}

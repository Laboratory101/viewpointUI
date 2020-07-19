import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class LoaderService {
    public status = new BehaviorSubject(false);

    display(value: boolean) {
        if (value === false) {
            setTimeout(() => { this.status.next(value); }, 1000);
        } else {
            this.status.next(value);
        }
    }
}

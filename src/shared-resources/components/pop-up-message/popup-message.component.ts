import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-pop-up-message',
    templateUrl: './popup-message.component.html',
    styleUrls: ['./popup-message.component.scss']
})
export class PopupMessageComponent implements OnInit {

    message: string;
    type: string;

    constructor(@Inject(MAT_SNACK_BAR_DATA) private data: any) { }

    ngOnInit(): void {
        this.message = this.data.message;
        this.type = this.data.type;
    }
}

import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective {

  @Input('copyToClipboard') private payload: string;
  @Output('copied') private copied: EventEmitter<string> = new EventEmitter<string>();

  constructor(private snackBar: MatSnackBar) { }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.payload) {
      return;
    }

    const listener = (evnt: ClipboardEvent) => {
      const clipboard = evnt.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.payload.toString());
      evnt.preventDefault();
      this.copied.emit(this.payload);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);

    this.snackBar.open('Content copied to clipboard', 'Info', {
      duration: 2000
    });
  }

}

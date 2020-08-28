import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

const errorList: { [key: string]: Function } = {
  'required': () => 'Mandatory field',
  'min': (params) => `Minimum ${params.min} is required`,
  'max': (params) => `Maximum limit is ${params.max}`,
  'maxlength': (params) => `Maximum of ${params.requiredLength} characters is allowed`,
  'minlength': (params) => `Minimum of ${params.requiredLength} characters is required`,
  'atleastOne': () => 'Please provide value for either one of the field'
}

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit, OnChanges {

  errorMessages: Array<string>;

  @Input() readonly control: AbstractControlDirective | AbstractControl;
  @Input() readonly status: boolean;
  @Input() readonly groupControl: AbstractControl;


  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.status) {
      this.errorMessages = this.getListOfErrors();
    }
  }

  private getListOfErrors(): Array<any> {
    if (this.control && this.control.errors) {
      return Object.keys(this.control.errors)
        .map(field => this.getMessage(field, this.control.errors[field]));
    } else if (this.groupControl && this.groupControl.errors) {
      return Object.keys(this.groupControl.errors)
        .map(field => this.getMessage(field, this.groupControl.errors[field]));
    } else {
      return []
    }
  }

  private getMessage(type: string, params: any) {
    return errorList[type](params);
  }
}

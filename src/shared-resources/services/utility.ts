import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

export function createUUID() {
    return uuidv4();
}

export function addDays(date: any, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
}

export function validateAllFormFields(formGroup) {
    // let here = this;
    Object.keys(formGroup.controls).forEach(field => {
        let control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            validateAllFormFields(control);
        } else if (control instanceof FormArray) {
            validateAllFormFields(control);
        }
    });
}

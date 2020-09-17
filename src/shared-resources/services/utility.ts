import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable, defer } from 'rxjs';
import { tap } from 'rxjs/operators';

export function createUUID() {
    return uuidv4();
}

export function addDays(date: any, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
}

export function validateAllFormFields(formGroup) {
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

export function tapOnce<T>(fn: (value: any) => void) {
    return (source: Observable<any>) =>
        defer(() => {
            let first = true;
            return source.pipe(
                tap<T>((payload) => {
                    if (first) {
                        fn(payload);
                    }
                    first = false;
                })
            );
        });
}

export function generateChartData(dataSource: Array<any>, displayType: number): Array<{ label: string, value: number }> {
    return dataSource.map((data: any, index: number) => ({
        label: data.text || `Cndt ${index}`,
        value: (displayType === 1) ? data.count : 0
    }));
}

import { FormGroup } from '@angular/forms';

export function TwoFieldMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.twoFieldMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
		alert(matchingControl.value)
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ twoFieldMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
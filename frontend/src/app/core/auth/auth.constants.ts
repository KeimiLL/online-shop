import { AbstractControl, ValidatorFn } from "@angular/forms";

export const matchValuesValidator = (
    controlName: string,
    matchingControlName: string
): ValidatorFn => {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (
            matchingControl?.errors &&
            !matchingControl?.errors?.["matchValuesValidator"]
        ) {
            return null;
        }

        if (control?.value !== matchingControl?.value) {
            const error = { matchValuesValidator: "Passwords don't match." };
            matchingControl?.setErrors(error);
            return error;
        } else {
            matchingControl?.setErrors(null);
            return null;
        }
    };
};

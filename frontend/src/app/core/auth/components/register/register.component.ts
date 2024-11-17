import { Component, inject } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { User } from "../../auth.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common";
import { AuthHttpService } from "../../auth-http.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { matchValuesValidator } from "../../auth.constants";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
    ],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
})
export class RegisterComponent {
    protected myForm: FormGroup;
    readonly #authHTTPService = inject(AuthHttpService);
    #snackBar = inject(MatSnackBar);

    constructor() {
        this.myForm = new FormGroup(
            {
                firstName: new FormControl<string>("", Validators.required),
                lastName: new FormControl<string>("", Validators.required),
                email: new FormControl<string>("", [
                    Validators.required,
                    Validators.email,
                ]),
                password: new FormControl<string>("", [
                    Validators.required,
                    Validators.minLength(8),
                ]),
                confirmPassword: new FormControl<string>("", [
                    Validators.required,
                    Validators.minLength(8),
                ]),
            },
            {
                validators: matchValuesValidator("password", "confirmPassword"),
            }
        );
    }

    get firstName() {
        return this.myForm.get("firstName");
    }

    get lastName() {
        return this.myForm.get("lastName");
    }

    get email() {
        return this.myForm.get("email");
    }

    get password() {
        return this.myForm.get("password");
    }

    get confirmPassword() {
        return this.myForm.get("confirmPassword");
    }

    onSubmit(): void {
        const { firstName, lastName, email } = this.myForm.value;
        const newUser: User = {
            first_name: firstName,
            last_name: lastName,
            email,
        };
        this.#authHTTPService
            .createUser$(newUser)
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
                this.#snackBar.open("User created successfully", "Close", {
                    duration: 3000,
                });
                this.myForm.reset();
            });
    }
}

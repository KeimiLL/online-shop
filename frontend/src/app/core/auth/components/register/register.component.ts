import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription, tap } from "rxjs";

import { matchValuesValidator } from "../../auth.constants";
import { DBUser } from "../../auth.model";
import { AuthHttpService } from "../../auth-http.service";

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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
    protected registerFormGroup: FormGroup;
    protected createUserSubscription = new Subscription();
    readonly #authHTTPService = inject(AuthHttpService);
    #snackBar = inject(MatSnackBar);
    #router = inject(Router);

    constructor() {
        this.registerFormGroup = new FormGroup(
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
        return this.registerFormGroup.get("firstName");
    }

    get lastName() {
        return this.registerFormGroup.get("lastName");
    }

    get email() {
        return this.registerFormGroup.get("email");
    }

    get password() {
        return this.registerFormGroup.get("password");
    }

    get confirmPassword() {
        return this.registerFormGroup.get("confirmPassword");
    }

    ngOnDestroy(): void {
        this.createUserSubscription.unsubscribe();
    }

    protected onSubmit(): void {
        const { firstName, lastName, email, password } =
            this.registerFormGroup.value;
        const newUser: DBUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };
        this.createUserSubscription = this.#authHTTPService
            .createUser$(newUser)
            .pipe(
                tap(() => this.#router.navigate(['/home'])),
                tap(() =>  this.#snackBar.open("User created successfully", "Close", {
                    duration: 5000,
                })),
                tap(() => this.registerFormGroup.reset())
            )
            .subscribe();
    }
}

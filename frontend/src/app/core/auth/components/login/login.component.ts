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
import { Subscription, tap } from "rxjs";

import { AuthHttpService } from "../../auth-http.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
    protected loginFormGroup: FormGroup;
    protected loginUserSubscription = new Subscription();
    readonly #authHTTPService = inject(AuthHttpService);

    constructor() {
        this.loginFormGroup = new FormGroup({
            email: new FormControl<string>("", [Validators.required]),
            password: new FormControl<string>("", [Validators.required]),
        });
    }

    ngOnDestroy(): void {
        this.loginUserSubscription.unsubscribe();
    }

    protected onSubmit(): void {
        const { email, password } = this.loginFormGroup.value;
        this.loginUserSubscription = this.#authHTTPService
            .loginUser$(email, password)
            .pipe(
                tap((tokenResponse) => {
                    console.log(tokenResponse);
                })
            )
            .subscribe(() => {
                this.loginFormGroup.reset();
            });
    }
}

import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: "app-auth",
    standalone: true,
    imports: [LoginComponent, RegisterComponent, MatButtonModule, CommonModule],
    templateUrl: "./auth.component.html",
    styleUrl: "./auth.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
    protected isLogin = signal(true);
    protected buttonMessage = computed(() =>
        this.isLogin() ? "Create an account" : "Log in"
    );
    protected buttonQuestion = computed(() =>
        this.isLogin()
            ? "Do not have an account yet?"
            : "Already have an account?" 
    );

    protected toggleAuthPage() {
        this.isLogin.set(!this.isLogin());
    }
}
